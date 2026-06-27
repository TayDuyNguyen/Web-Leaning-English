import { useState, useEffect } from 'react';
import { AuthContext } from './auth-context';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(!isSupabaseConfigured);
  
  // Auth Modal States
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [authMessage, setAuthMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openAuthModal = () => {
    setAuthError(null);
    setAuthMessage(null);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  useEffect(() => {
    if (!isSupabaseConfigured) {
      return undefined;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      setAuthReady(true);
    });

    // Listen to changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setAuthReady(true);
        if (event === 'SIGNED_IN') {
          setIsAuthModalOpen(false);
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signInWithPassword = async ({ email, password }) => {
    setAuthError(null);
    setAuthMessage(null);
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data;
    } catch (err) {
      setAuthError(err.message || 'Đăng nhập thất bại.');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const signUpWithPassword = async ({ email, password }) => {
    setAuthError(null);
    setAuthMessage(null);
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      
      // If auto-confirm is off, tell user to check their email
      if (data?.session) {
        setAuthMessage('Đăng ký thành công và đã đăng nhập!');
      } else {
        setAuthMessage('Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản.');
      }
      return data;
    } catch (err) {
      setAuthError(err.message || 'Đăng ký thất bại.');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const signOut = async () => {
    if (!isSupabaseConfigured) return;
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error signing out:', error);
  };

  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider
      value={{
        authReady,
        isAuthenticated,
        openAuthModal,
        closeAuthModal,
        isAuthModalOpen,
        session,
        user,
        signOut,
        signInWithPassword,
        signUpWithPassword,
        authError,
        authMessage,
        isSubmitting,
        isSupabaseConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
