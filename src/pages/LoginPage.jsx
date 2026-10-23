
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, ShoppingBag } from 'lucide-react';
import { validateLogin } from '../components/utils/validation';
import './LoginPage.css';

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateLogin({ email, password });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // Demo login only; this does not authenticate with a server.
    onLogin?.({ email: email.trim() });
    navigate('/shop');
  }

  return (
    <main className="login-page">
      <button
        type="button"
        className="login-back"
        onClick={() => navigate('/')}
      >
        <ArrowLeft size={17} /> Back to home
      </button>

      <section className="login-card">
        <Link to="/" className="login-brand">
          <ShoppingBag size={27} />
          <span>ShopSmart</span>
        </Link>

        <h1>Welcome back!</h1>
        <p className="login-subtitle">
          Sign in to continue shopping.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="login-email">Email address</label>
          <input
            id="login-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'login-email-error' : undefined}
            onChange={(event) => {
              setEmail(event.target.value);
              setErrors((prev) => ({ ...prev, email: '' }));
            }}
            required
          />

          {errors.email && (
            <p id="login-email-error" className="login-error" role="alert">
              {errors.email}
            </p>
          )}

          <label htmlFor="login-password">Password</label>
          <div className="login-password-wrap">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password ? 'login-password-error' : undefined
              }
              onChange={(event) => {
                setPassword(event.target.value);
                setErrors((prev) => ({ ...prev, password: '' }));
              }}
              required
            />

            <button
              type="button"
              className="login-eye"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.password && (
            <p
              id="login-password-error"
              className="login-error"
              role="alert"
            >
              {errors.password}
            </p>
          )}

          <button type="submit" className="login-submit">
            Sign in
          </button>
        </form>

        <p className="login-signup">
          New to ShopSmart?{' '}
          <button type="button" onClick={() => navigate('/register')}>
            Create an account
          </button>
        </p>

        <p className="login-demo-note">
          Demo sign-in only — credentials are not verified yet.
        </p>
      </section>
    </main>
  );
}
