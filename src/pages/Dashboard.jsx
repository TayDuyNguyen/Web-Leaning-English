import { useState, useMemo } from 'react';
import { grammarTopics } from '../data/topics';

export default function Dashboard({ onSelectTopic, scores }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { key: 'All', label: 'Tất cả' },
    { key: 'Động từ', label: 'Động từ' },
    { key: 'Từ loại', label: 'Từ loại' },
    { key: 'Cấu trúc câu', label: 'Cấu trúc' },
    { key: 'Mệnh đề', label: 'Mệnh đề' },
    { key: 'Tổng ôn', label: 'Tổng ôn' }
  ];

  const filteredTopics = useMemo(() => {
    return grammarTopics.filter(t => {
      const matchCat = activeCategory === 'All' || t.category.includes(activeCategory);
      const matchSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.englishName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const getTopicProgress = (topicId, totalExercises) => {
    const tSc = scores[topicId];
    let doneCount = 0;
    if (tSc) {
      for (let i = 0; i < totalExercises; i++) {
        if (tSc[i]?.completed) {
          doneCount++;
        }
      }
    }
    return doneCount;
  };

  const getTopicStatus = (topicId, totalExercises) => {
    const tSc = scores[topicId];
    if (!tSc) return 'Chưa bắt đầu';
    
    let doneCount = 0;
    let started = false;
    for (let i = 0; i < totalExercises; i++) {
      if (tSc[i]) {
        started = true;
        if (tSc[i].completed) doneCount++;
      }
    }
    if (doneCount === totalExercises && totalExercises > 0) return 'Đã hoàn thành';
    if (started) return 'Đang học';
    return 'Chưa bắt đầu';
  };

  return (
    <div id="dashboardView" className="dashboard-container">
      
      {/* Banner Game Advertisement */}
      <div className="surface-card ad-banner">
        <div style={{ flex: 1, minWidth: '280px' }}>
          <span className="badge badge--ad">MỚI RA MẮT</span>
          <h2 className="ad-banner__title">
            Học tiếng Anh qua đấu trường ngữ pháp!
          </h2>
          <p className="ad-banner__desc">
            Thử tài với chế độ tốc độ ngữ pháp hoặc thử thách lắp ghép câu chuẩn ngữ pháp. Tích lũy combo nhân điểm số và chinh phục bảng vàng!
          </p>
        </div>
        <button onClick={() => onSelectTopic('game')} className="btn btn--yellow-ad">Vào Đấu Trường ⚔️</button>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="tab-group">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`tab category-tab ${activeCategory === cat.key ? 'tab--active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className="search-wrap" style={{ width: '280px' }}>
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            id="topicSearch"
            className="input-text"
            placeholder="Tìm chuyên đề..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Topics Grid */}
      <div id="topicsGrid" className="topics-grid">
        {filteredTopics.length === 0 ? (
          <div style={{ gridColumn: '1/-1', padding: '64px 0', textAlign: 'center', color: 'var(--muted)', fontWeight: 700 }}>
            Không tìm thấy chuyên đề phù hợp.
          </div>
        ) : (
          filteredTopics.map((topic, idx) => {
            const doneEx = getTopicProgress(topic.id, topic.exercisesCount);
            const status = getTopicStatus(topic.id, topic.exercisesCount);
            
            let badgeClass = 'badge--pending';
            if (status === 'Đã hoàn thành') badgeClass = 'badge--success';
            else if (status === 'Đang học') badgeClass = 'badge--warning';
            
            const isFeatured = idx < 2 && (status === 'Đang học' || status === 'Đã hoàn thành' || topic.id === 'chuyen-de-thi-dong-tu' || topic.id === 'su-phoi-thi');

            return (
              <div
                key={topic.id}
                className={`topic-card${isFeatured ? ' topic-card--featured' : ''}`}
                role="button"
                tabIndex="0"
                onClick={() => onSelectTopic(topic.id)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectTopic(topic.id); }}
              >
                <div className="topic-card__header">
                  <div className="topic-card__icon">{topic.icon}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                    <span className="topic-card__num">Chuyên đề {topic.number}</span>
                    <span className={`badge ${badgeClass}`}>
                      {status === 'Đã hoàn thành' ? '✓ Hoàn thành' : status}
                    </span>
                  </div>
                </div>
                <div>
                  <h3>{topic.name}</h3>
                  <p className="topic-card__en">{topic.englishName}</p>
                  <p className="topic-card__desc">{topic.description}</p>
                </div>
                <div className="topic-card__footer">
                  <span className={`badge ${isFeatured ? 'badge--featured' : 'badge--blue'} badge--dashboard`}>
                    {topic.category}
                  </span>
                  <span className="topic-exercises-chip">{doneEx}/{topic.exercisesCount} Bài tập</span>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
