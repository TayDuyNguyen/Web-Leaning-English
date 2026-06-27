// GrammaX brand logo icon (inline SVG for crisp rendering)
function GrammaXIcon({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="gx-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" ry="14" fill="url(#gx-bg)" />
      {/* G letter */}
      <text x="8" y="43" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="30" fill="white">G</text>
      {/* X in accent gold */}
      <text x="35" y="55" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="26" fill="#FBBF24">X</text>
      {/* Small gold dot accent */}
      <circle cx="56" cy="10" r="4" fill="#FBBF24" />
    </svg>
  );
}

export default function Header({
  activeTab,
  setActiveTab,
  theme,
  toggleTheme,
  canQuit,
  isAuthenticated,
  onOpenAuthModal,
  onSignOut,
  isHydratingCloud,
}) {
  const handleNavClick = (tabId, e) => {
    e.preventDefault();
    if (!canQuit()) return;
    setActiveTab(tabId);
  };

  const handleAccountClick = (handler) => {
    if (!canQuit()) return;
    handler();
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        {/* Brand Logo */}
        <a href="/" onClick={(e) => handleNavClick('topics', e)} className="site-logo" aria-label="GrammaX - Trang chủ">
          <span className="site-logo__icon">
            <GrammaXIcon size={36} />
          </span>
          <span className="site-logo__text">
            <span className="site-logo__name">Gramma</span><span className="site-logo__x">X</span>
          </span>
        </a>

        {/* Navigation */}
        <nav className="header-nav" aria-label="Điều hướng chính">
          <a
            href="#"
            onClick={(e) => handleNavClick('topics', e)}
            id="navTabTopics"
            className={`header-nav__link ${activeTab === 'topics' ? 'header-nav__link--active' : ''}`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{flexShrink:0}}>
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
            Chuyên đề
          </a>

          <a
            href="#"
            onClick={(e) => handleNavClick('game', e)}
            id="navTabGame"
            className={`header-nav__link ${activeTab === 'game' ? 'header-nav__link--active' : ''}`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{flexShrink:0}}>
              <path d="m15 22-3-3-3 3V2l6 4 6-4v7"/><path d="M9 9h.01"/><path d="M6 6h.01"/><path d="M18 19c0 1.7-1.3 3-3 3H9"/><path d="M21 15H3"/><path d="m9 22 3-3 3 3"/>
            </svg>
            Trò chơi
          </a>

          <a href="#" className="header-nav__link header-nav__link--disabled" onClick={(e) => e.preventDefault()} aria-disabled="true" title="Sắp ra mắt">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{flexShrink:0}}>
              <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
            </svg>
            Tiến độ
          </a>

          {isAuthenticated ? (
            <button type="button" onClick={() => handleAccountClick(onSignOut)} className="header-nav__link header-nav__link--button">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <path d="m16 17 5-5-5-5" />
                <path d="M21 12H9" />
              </svg>
              Thoát tài khoản
            </button>
          ) : (
            <button type="button" onClick={() => handleAccountClick(onOpenAuthModal)} className="header-nav__link header-nav__link--button">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
                <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Z" />
                <path d="M20 21a8 8 0 1 0-16 0" />
              </svg>
              Đăng nhập
            </button>
          )}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="btn--icon-round"
            title={theme === 'dark' ? 'Chuyển sang sáng' : 'Chuyển sang tối'}
            id="themeBtn"
            aria-label="Chuyển chế độ sáng/tối"
          >
            {theme === 'dark' ? (
              <svg id="sunIcon" width="17" height="17" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg id="moonIcon" width="17" height="17" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>
        </nav>
      </div>
      <div className="site-header__status">
        {isHydratingCloud ? 'Đang đồng bộ dữ liệu...' : isAuthenticated ? 'Đang lưu đám mây' : 'Đang lưu cục bộ'}
      </div>
    </header>
  );
}
