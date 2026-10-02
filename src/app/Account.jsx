import { useState } from 'react';

// The panel has to be honest about the case that matters most here: no Supabase
// project exists yet, so "sign in" must not look like a broken button. When the
// credentials are absent it says so and explains that play and progress still work,
// rather than rendering a form that can only fail.
export default function Account({ source, email, busy, error, onSignIn, onSignUp, onSignOut }) {
  const [credential, setCredential] = useState({ email: '', password: '' });

  if (source === 'cloud') {
    return (
      <div className="account">
        <p className="account-state">Đang đồng bộ cloud: <strong>{email}</strong></p>
        <button type="button" className="ghost-button" disabled={busy} onClick={onSignOut}>Đăng xuất</button>
        {error ? <p className="account-error">{error}</p> : null}
      </div>
    );
  }

  if (source === 'local-unsupported') {
    return (
      <p className="account-note">
        Chưa cấu hình Supabase, nên mọi tiến độ chỉ lưu trên máy này qua <code>localStorage</code>.
        Đóng tab hay tắt trình duyệt vẫn không mất. Để đồng bộ giữa các thiết bị, tạo project rồi
        thêm <code>.env</code> theo <code>.env.example</code>.
      </p>
    );
  }

  function submit(action) {
    return (event) => {
      event.preventDefault();
      action(credential.email, credential.password);
    };
  }

  return (
    <form className="account" onSubmit={submit(onSignIn)}>
      <p className="account-note">Supabase đã cấu hình nhưng bạn chưa đăng nhập. Đang lưu cục bộ cho tới khi đăng nhập.</p>
      <div className="account-fields">
        <input
          className="scramble-input"
          type="email"
          placeholder="Email"
          value={credential.email}
          autoComplete="username"
          onChange={(event) => setCredential({ ...credential, email: event.target.value })}
        />
        <input
          className="scramble-input"
          type="password"
          placeholder="Mật khẩu"
          value={credential.password}
          autoComplete="current-password"
          onChange={(event) => setCredential({ ...credential, password: event.target.value })}
        />
      </div>
      <div className="result-actions">
        <button type="button" className="primary-button" disabled={busy} onClick={submit(onSignIn)}>Đăng nhập</button>
        <button type="button" className="ghost-button" disabled={busy} onClick={submit(onSignUp)}>Tạo tài khoản</button>
      </div>
      {error ? <p className="account-error">{error}</p> : null}
    </form>
  );
}
