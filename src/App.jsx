import { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Dashboard from './pages/Dashboard';
import TopicStudy from './pages/TopicStudy';
import GameArena from './pages/GameArena';
import { useAuth } from './hooks/useAuth';
import {
  getCloudMigrationKey,
  getLocalProfile,
  getLocalTopicScores,
  hasMeaningfulLocalData,
  loadProfile,
  loadTopicScores,
  migrateLocalDataToCloud,
  saveProfilePatch,
  saveTopicScores,
} from './lib/userStorage';

export default function App() {
  const {
    authReady,
    isAuthenticated,
    openAuthModal,
    session,
    signOut,
  } = useAuth();
  const [isHydratingCloud, setIsHydratingCloud] = useState(false);
  const previousUserIdRef = useRef(null);

  function canQuit() {
    if (isQuitLocked) {
      if (window.confirm("⚠️ Bạn chưa thuộc hết từ vựng! Bạn có chắc chắn muốn bỏ dở trận đấu và thoát?")) {
        setIsQuitLocked(false);
        return true;
      }
      return false;
    }
    return true;
  }

  // Theme state
  const [theme, setTheme] = useState(() => {
    return getLocalProfile().theme;
  });

  // Navigation tab state ('topics' is dashboard, 'game' is arena, or specific topic IDs)
  const [activeTab, setActiveTab] = useState(() => {
    // If there is a URL hash like #game, load it by default
    if (window.location.hash === '#game' || window.location.hash.startsWith('#game/')) {
      return 'game';
    }
    return 'topics';
  });

  // Track scores across all topic exercises
  const [scores, setScores] = useState(() => {
    return getLocalTopicScores();
  });

  // Global quit lock state for Vocab Battle
  const [isQuitLocked, setIsQuitLocked] = useState(false);

  // Hydrate storage after auth state is known
  useEffect(() => {
    if (!authReady) return undefined;

    let isCancelled = false;

    const hydrate = async () => {
      setIsHydratingCloud(true);
      try {
        if (session?.user?.id && previousUserIdRef.current !== session.user.id) {
          const migrationKey = getCloudMigrationKey(session.user.id);
          if (!localStorage.getItem(migrationKey) && hasMeaningfulLocalData()) {
            const shouldMigrate = window.confirm(
              'Phát hiện dữ liệu cục bộ trên thiết bị này. Bạn có muốn đẩy dữ liệu hiện tại lên đám mây không?'
            );
            if (shouldMigrate) {
              await migrateLocalDataToCloud(session);
            }
            localStorage.setItem(migrationKey, 'done');
          }
        }

        const [profile, nextScores] = await Promise.all([
          loadProfile(session),
          loadTopicScores(session),
        ]);

        if (isCancelled) return;

        setTheme(profile.theme);
        setScores(nextScores);
        previousUserIdRef.current = session?.user?.id || null;
      } catch (error) {
        console.error('Failed to hydrate app storage:', error);
      } finally {
        if (!isCancelled) {
          setIsHydratingCloud(false);
        }
      }
    };

    hydrate();

    return () => {
      isCancelled = true;
    };
  }, [authReady, session]);

  // Sync theme with document class list
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Sync URL hash for refresh resilience
  useEffect(() => {
    if (activeTab === 'game') {
      if (window.location.hash !== '#game' && !window.location.hash.startsWith('#game/')) {
        window.location.hash = '#game';
      }
    } else if (activeTab === 'topics') {
      if (window.location.hash !== '' && window.location.hash !== '#topics') {
        window.location.hash = '';
      }
    } else {
      const expectedPrefix = `#topic-${activeTab}`;
      if (!window.location.hash.startsWith(expectedPrefix)) {
        window.location.hash = expectedPrefix;
      }
    }
  }, [activeTab]);

  // Listen to hash change to support browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      
      let targetTab = 'topics';
      if (hash === '#game' || hash.startsWith('#game/')) {
        targetTab = 'game';
      } else if (hash.startsWith('#topic-')) {
        targetTab = hash.replace('#topic-', '').split('/')[0];
      }

      if (targetTab === activeTab) return;

      if (isQuitLocked) {
        if (!window.confirm("⚠️ Bạn chưa thuộc hết từ vựng! Bạn có chắc chắn muốn bỏ dở trận đấu và thoát?")) {
          // Revert hash back to match the activeTab when quit is locked in battle
          window.location.hash = '#game/battle';
          return;
        }
        setIsQuitLocked(false);
      }

      setActiveTab(targetTab);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activeTab, isQuitLocked]);

  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    if (!authReady) return;
    saveProfilePatch(session, { theme }).catch((error) => {
      console.error('Failed to save theme:', error);
    });
  }, [authReady, session, theme]);

  const handleUpdateScores = (topicId, newTopicScores) => {
    const updated = { ...scores, [topicId]: newTopicScores };
    setScores(updated);
    saveTopicScores(session, updated).catch((error) => {
      console.error('Failed to save topic scores:', error);
    });
  };

  const handleTabChange = (tabId) => {
    if (!canQuit()) return;
    setActiveTab(tabId);
  };

  const handleSelectTopic = (topicId) => {
    if (!canQuit()) return;
    setActiveTab(topicId);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  // Determine main background color based on active tab (matching original stylesheet specs)
  const mainBg = activeTab === 'game' ? 'var(--bg-app)' : 'var(--bg-main)';

  return (
    <div className="site-layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* Navigation Header */}
      <Header 
        activeTab={activeTab === 'game' ? 'game' : 'topics'} 
        setActiveTab={handleTabChange} 
        theme={theme} 
        toggleTheme={handleToggleTheme}
        canQuit={canQuit}
        isAuthenticated={isAuthenticated}
        onOpenAuthModal={openAuthModal}
        onSignOut={handleSignOut}
        isHydratingCloud={isHydratingCloud}
      />

      {/* Main Content Render Area */}
      <main id="mainContentArea" style={{ background: mainBg, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {activeTab === 'topics' && (
          <Dashboard 
            onSelectTopic={handleSelectTopic} 
            scores={scores} 
          />
        )}

        {activeTab === 'game' && (
          <GameArena 
            updateQuitLock={setIsQuitLocked} 
          />
        )}

        {/* Dynamic Topic Study pages */}
        {activeTab !== 'topics' && activeTab !== 'game' && (
          <TopicStudy 
            key={activeTab}
            topicId={activeTab} 
            onBackToDashboard={() => handleTabChange('topics')}
            scores={scores}
            onUpdateScores={handleUpdateScores}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />
      <AuthModal />

    </div>
  );
}
