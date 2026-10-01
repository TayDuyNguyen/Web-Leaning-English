// Learning content moves from src/data/*.js into Supabase as relational rows
// (roadmap Phase 1 / migration M2). This module is the single definition of that
// mapping, shared by the seed script (node) and the browser read layer, so the two
// can never disagree about what a row means.
//
// It is deliberately pure: no imports, no `import.meta.env`, no network. That is
// what lets `node --test` assert the mapping is lossless against the real content.
//
// `position` is 0-based and is the number the URL already carries: `#topic-x/
// theory-2` is the lesson whose position is 2. Keeping them equal means a deep link
// resolves to the same row regardless of which tree produced the content.

function isBlank(value) {
  return value === undefined || value === null || value === '';
}

function topicIdFrom(prefix, position, kind) {
  return `${prefix}/${kind}/${position}`;
}

// One row per question; `number` is the source `num`, which progress is keyed by
// (see TopicStudy's `answers[q.num]`), so it is carried verbatim and must be unique
// inside its exercise.
function normalizeQuestions(topicId, exercisePosition, questions, problems) {
  const rows = [];
  const seen = new Set();

  (questions || []).forEach((question, position) => {
    if (isBlank(question.num)) {
      problems.push(`question ${position} of exercise "${topicId}/exercise/${exercisePosition}" has no num`);
      return;
    }
    if (seen.has(question.num)) {
      problems.push(`duplicate num ${question.num} in exercise "${topicId}/exercise/${exercisePosition}"`);
      return;
    }
    seen.add(question.num);

    if (isBlank(question.text)) {
      problems.push(`question ${question.num} in exercise "${topicId}/exercise/${exercisePosition}" has no text`);
    }
    if (isBlank(question.answer)) {
      problems.push(`question ${question.num} in exercise "${topicId}/exercise/${exercisePosition}" has no answer`);
    }

    rows.push({
      id: `${topicIdFrom(topicId, exercisePosition, 'exercise')}/q/${question.num}`,
      exercise_id: `${topicIdFrom(topicId, exercisePosition, 'exercise')}`,
      position,
      question_number: question.num,
      question_type: question.type || 'fill',
      question_text: question.text ?? null,
      answer: question.answer ?? null,
      explanation: question.explanation ?? null,
      options: question.options ?? null,
    });
  });

  return rows;
}

/**
 * Turns one topic's bundled payload into rows for topics / lessons / exercises /
 * exercise_questions. `content` may be null: a catalogued topic with no authored
 * lessons is still a real row, and that is what lets the dashboard render its list
 * from the database instead of from topics.js.
 *
 * Throws with every problem found rather than the first one, because a seeder that
 * half-loads a topic is worse than one that refuses to load it.
 */
export function normalizeTopic(meta, content) {
  if (!meta || isBlank(meta.id)) {
    throw new Error('normalizeTopic requires a topic meta with an id');
  }

  const problems = [];
  const lessons = [];
  const exercises = [];
  const questions = [];

  const theory = content?.tenses || [];
  theory.forEach((lesson, position) => {
    if (isBlank(lesson.name)) {
      problems.push(`theory section ${position} of topic "${meta.id}" has no name`);
    }
    if (!Number.isInteger(lesson.id) || lesson.id !== position + 1) {
      problems.push(
        `theory section ${position} of topic "${meta.id}" has id ${JSON.stringify(lesson.id)}; ` +
          'positions must be 1-based and contiguous because the view model regenerates id from position'
      );
    }

    lessons.push({
      id: topicIdFrom(meta.id, position, 'theory'),
      topic_id: meta.id,
      position,
      title: lesson.name ?? null,
      usage_text: lesson.usage ?? null,
      formula: lesson.formula ?? null,
      signals_text: lesson.signals ?? null,
    });
  });

  const practice = content?.exercises || [];
  practice.forEach((exercise, position) => {
    if (isBlank(exercise.name)) {
      problems.push(`exercise ${position} of topic "${meta.id}" has no name`);
    }

    exercises.push({
      id: topicIdFrom(meta.id, position, 'exercise'),
      topic_id: meta.id,
      position,
      title: exercise.name ?? null,
      description: exercise.description ?? null,
    });

    questions.push(...normalizeQuestions(meta.id, position, exercise.questions, problems));
  });

  if (problems.length > 0) {
    throw new Error(`Cannot ingest topic "${meta.id}":\n  - ${problems.join('\n  - ')}`);
  }

  return {
    topic: {
      id: meta.id,
      number: meta.number,
      name: meta.name,
      english_name: meta.englishName ?? null,
      category: meta.category ?? null,
      description: meta.description ?? null,
      icon: meta.icon ?? null,
      exercise_count: exercises.length,
    },
    lessons,
    exercises,
    questions,
  };
}

// Keys absent in the source stay absent, so denormalizeTopic(normalizeTopic(x))
// deep-equals x rather than merely looking similar. A drift here would silently
// change answer-checking (`q.options` presence decides the choice-vs-fill branch).
function withOptional(key, value, target) {
  if (value !== null && value !== undefined) {
    target[key] = value;
  }
}

/**
 * Rebuilds the `{ tenses, exercises }` shape TopicStudy already renders from rows,
 * ordered by position. Returns null when a topic has no content rows, which is the
 * same signal the bundled tree gives for its 28 unpopulated topics.
 */
export function denormalizeTopic(topicId, lessonRows = [], exerciseRows = [], questionRows = []) {
  if (lessonRows.length === 0 && exerciseRows.length === 0) return null;

  const byPosition = (a, b) => a.position - b.position;
  const questionsByExercise = new Map();
  for (const row of questionRows) {
    const list = questionsByExercise.get(row.exercise_id);
    if (list) list.push(row);
    else questionsByExercise.set(row.exercise_id, [row]);
  }

  return {
    tenses: [...lessonRows]
      .sort(byPosition)
      .map((row) => ({
        id: row.position + 1,
        name: row.title,
        usage: row.usage_text,
        formula: row.formula ?? undefined,
        signals: row.signals_text,
      })),
    exercises: [...exerciseRows]
      .sort(byPosition)
      .map((row) => {
        const exercise = { name: row.title };
        withOptional('description', row.description, exercise);
        exercise.questions = (questionsByExercise.get(row.id) || [])
          .sort(byPosition)
          .map((question) => {
            const built = { num: question.question_number, type: question.question_type };
            withOptional('text', question.question_text, built);
            withOptional('answer', question.answer, built);
            withOptional('explanation', question.explanation, built);
            withOptional('options', question.options, built);
            return built;
          });
        return exercise;
      }),
  };
}

/**
 * Row -> the exact view model the UI already consumes (camelCase keys from
 * src/data/topics.js), so neither Dashboard nor TopicStudy needs to learn a second
 * spelling of a topic.
 */
export function toTopicViewModel(row) {
  return {
    id: row.id,
    number: row.number,
    name: row.name,
    englishName: row.english_name ?? '',
    category: row.category ?? '',
    description: row.description ?? '',
    icon: row.icon ?? '📘',
    exercisesCount: row.exercise_count ?? 0,
  };
}
