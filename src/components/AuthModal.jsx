import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    signInWithPassword,
    signUpWithPassword,
    authError,
    authMessage,
    isSubmitting,
    isSupabaseConfigured,
  } = useAuth();

  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (mode === 'signup' && password !== confirmPassword) {
      return;
    }

    try {
      if (mode === 'signin') {
        await signInWithPassword({ email: email.trim(), password });
      } else {
        await signUpWithPassword({ email: email.trim(), password });
      }
    } catch {
      // Error state is handled in AuthContext.
    }
  };

  const passwordMismatch = mode === 'signup' && confirmPassword && password !== confirmPassword;

  return (
    <div className="auth-modal-overlay" onClick={closeAuthModal} role="presentation">
      <div
        className="auth-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="authModalTitle"
      >
        <div className="auth-modal__header">
          <div>
            <h3 id="authModalTitle" className="auth-modal__title">
              {mode === 'signin' ? 'Đăng nhập để lưu đám mây' : 'Tạo tài khoản đồng bộ'}
            </h3>
            <p className="auth-modal__subtitle">
              Khi đã đăng nhập, dữ liệu sẽ lưu trực tiếp lên Supabase và không lưu cục bộ nữa.
            </p>
          </div>
          <button type="button" onClick={closeAuthModal} className="auth-modal__close" aria-label="Đóng cửa sổ đăng nhập">
            &times;
          </button>
        </div>

        <div className="auth-switch">
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`btn ${mode === 'signin' ? 'btn--primary' : 'btn--outline-theme'}`}
          >
            Đăng nhập
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`btn ${mode === 'signup' ? 'btn--primary' : 'btn--outline-theme'}`}
          >
            Đăng ký
          </button>
        </div>

        {!isSupabaseConfigured && (
          <div className="auth-banner auth-banner--error">
            Supabase chưa được cấu hình. Hãy thêm `VITE_SUPABASE_URL` và `VITE_SUPABASE_PUBLISHABLE_KEY`.
          </div>
        )}

        {authMessage && <div className="auth-banner auth-banner--success">{authMessage}</div>}
        {authError && <div className="auth-banner auth-banner--error">{authError}</div>}
        {passwordMismatch && <div className="auth-banner auth-banner--error">Mật khẩu xác nhận chưa khớp.</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-form__field">
            <span>Thư điện tử</span>
            <input
              type="email"
              className="input-text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="vd: ban@example.com"
              required
            />
          </label>

          <label className="auth-form__field">
            <span>Mật khẩu</span>
            <input
              type="password"
              className="input-text"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Tối thiểu 6 ký tự"
              minLength={6}
              required
            />
          </label>

          {mode === 'signup' && (
            <label className="auth-form__field">
              <span>Xác nhận mật khẩu</span>
              <input
                type="password"
                className={`input-text${passwordMismatch ? ' input-text--error' : ''}`}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Nhập lại mật khẩu"
                minLength={6}
                required
              />
            </label>
          )}

          <button
            type="submit"
            className="btn btn--primary auth-form__submit"
            disabled={!isSupabaseConfigured || isSubmitting || passwordMismatch}
          >
            {isSubmitting ? 'Đang xử lý...' : mode === 'signin' ? 'Đăng nhập và bật lưu đám mây' : 'Tạo tài khoản'}
          </button>
        </form>
      </div>
    </div>
  );
}
