import { useCallback, useEffect, useState } from 'react';
import {
  BATTLE_HASH,
  hashForTab,
  hashMatchesTab,
  parseHashRoute,
  writeHashRoute,
} from '../lib/routes';

// Owns the top-level view: dashboard, arena or a topic id. Sub-routes
// (`#topic-<id>/theory-0`, `#game/rush`) belong to the mounted view, which reads and
// writes them itself.
export function useHashRouting({ confirmQuit }) {
  const [activeTab, setActiveTab] = useState(() => parseHashRoute(window.location.hash));

  // Mirror the URL when state changed without a navigation: a declined quit revert,
  // or a hash that does not describe the view being shown. Replaced rather than
  // pushed, so an address the user never visited does not land in the history stack.
  useEffect(() => {
    if (hashMatchesTab(window.location.hash, activeTab)) return;
    writeHashRoute(hashForTab(activeTab), { replace: true });
  }, [activeTab]);

  // Browser back/forward and hand-edited addresses.
  useEffect(() => {
    const handleHashChange = () => {
      const targetTab = parseHashRoute(window.location.hash);
      if (targetTab === activeTab) return;

      if (!confirmQuit()) {
        // Put the address back to the view that is still on screen.
        writeHashRoute(BATTLE_HASH, { replace: true });
        return;
      }

      setActiveTab(targetTab);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activeTab, confirmQuit]);

  const navigate = useCallback((tabId) => {
    if (tabId === activeTab) return;
    if (!confirmQuit()) return;
    setActiveTab(tabId);
    writeHashRoute(hashForTab(tabId));
  }, [activeTab, confirmQuit]);

  return { activeTab, navigate };
}
