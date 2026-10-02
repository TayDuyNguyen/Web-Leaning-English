import { useCallback, useEffect, useState } from 'react';
import { getLocalProfile, saveProfilePatch } from '../lib/userStorage';

export function useTheme({ authReady, session }) {
  const [theme, setTheme] = useState(() => getLocalProfile().theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    if (!authReady) return;
    saveProfilePatch(session, { theme }).catch((error) => {
      console.error('Failed to save theme:', error);
    });
  }, [authReady, session, theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, setTheme, toggleTheme };
}
