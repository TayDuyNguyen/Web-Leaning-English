import { useCallback, useState } from 'react';
import { getLocalTopicScores, saveTopicScores } from '../lib/userStorage';

// Per-topic exercise results, keyed by topic id. Written locally on every update and
// mirrored to Supabase when a session exists.
export function useTopicScores({ session }) {
  const [scores, setScores] = useState(() => getLocalTopicScores());

  const updateScores = useCallback((topicId, topicScores) => {
    const updated = { ...scores, [topicId]: topicScores };
    setScores(updated);
    saveTopicScores(session, updated).catch((error) => {
      console.error('Failed to save topic scores:', error);
    });
  }, [scores, session]);

  return { scores, setScores, updateScores };
}
