import Header from './components/Header';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Dashboard from './pages/Dashboard';
import TopicStudy from './pages/TopicStudy';
import GameArena from './pages/GameArena';
import { useAuth } from './hooks/useAuth';
import { useCloudHydration } from './hooks/useCloudHydration';
import { useHashRouting } from './hooks/useHashRouting';
import { useQuitGuard } from './hooks/useQuitGuard';
import { useTheme } from './hooks/useTheme';
import { useTopicScores } from './hooks/useTopicScores';
import { DASHBOARD_TAB, GAME_TAB } from './lib/routes';

export default function App() {
  const {
    authReady,
    isAuthenticated,
    openAuthModal,
    session,
    signOut,
  } = useAuth();

  const { setIsQuitLocked, confirmQuit } = useQuitGuard();
  const { theme, setTheme, toggleTheme } = useTheme({ authReady, session });
  const { scores, setScores, updateScores } = useTopicScores({ session });
  const { activeTab, navigate } = useHashRouting({ confirmQuit });

  const isHydratingCloud = useCloudHydration({
    authReady,
    session,
    onHydrated: (profile, nextScores) => {
      setTheme(profile.theme);
      setScores(nextScores);
    },
  });

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  // Arena keeps the app-level background flat; content pages use the panel colour.
  const mainBg = activeTab === GAME_TAB ? 'var(--bg-app)' : 'var(--bg-main)';

  return (
    <div className="site-layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* Navigation Header */}
      <Header 
        activeTab={activeTab === GAME_TAB ? 'game' : 'topics'} 
        setActiveTab={navigate} 
        theme={theme} 
        toggleTheme={toggleTheme}
        canQuit={confirmQuit}
        isAuthenticated={isAuthenticated}
        onOpenAuthModal={openAuthModal}
        onSignOut={handleSignOut}
        isHydratingCloud={isHydratingCloud}
      />

      {/* Main Content Render Area */}
      <main id="mainContentArea" style={{ background: mainBg, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {activeTab === DASHBOARD_TAB && (
          <Dashboard 
            onSelectTopic={navigate} 
            scores={scores} 
          />
        )}

        {activeTab === GAME_TAB && (
          <GameArena 
            updateQuitLock={setIsQuitLocked} 
          />
        )}

        {/* Dynamic Topic Study pages */}
        {activeTab !== DASHBOARD_TAB && activeTab !== GAME_TAB && (
          <TopicStudy 
            key={activeTab}
            topicId={activeTab} 
            onBackToDashboard={() => navigate(DASHBOARD_TAB)}
            scores={scores}
            onUpdateScores={updateScores}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />
      <AuthModal />

    </div>
  );
}
