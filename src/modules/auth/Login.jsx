import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  UtensilsCrossed,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  Crown,
  ChefHat,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

export function Login() {
  const { login, demoLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const res = login(email, password);
    if (res.success) {
      if (res.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate(from, { replace: true });
      }
    } else {
      setError(res.message);
    }
  };

  const handleDemo = (role) => {
    const res = demoLogin(role);
    if (res?.success) {
      if (role === 'admin') navigate('/admin');
      else navigate(from, { replace: true });
    }
  };

  return (
    <div
      style={{
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem'
      }}
    >
      <div
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '28px',
          padding: '2.5rem',
          maxWidth: '480px',
          width: '100%',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)'
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto',
              boxShadow: '0 8px 20px rgba(249, 115, 22, 0.35)'
            }}
          >
            <UtensilsCrossed size={32} />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', margin: '0 0 0.25rem 0' }}>
            Welcome to FlavorCraft
          </h1>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Sign in to explore gourmet recipes, meal plans & kitchen tools
          </p>
        </div>

        {/* 1-Click Fast Demo Logins */}
        <div style={{ background: 'var(--bg-elevated)', borderRadius: '18px', padding: '1.25rem', marginBottom: '1.75rem', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} color="#f97316" /> Zero-Delay 1-Click Demo Accounts
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
            <button
              onClick={() => handleDemo('admin')}
              className="btn btn-sm"
              style={{
                background: '#fef3c7',
                color: '#b45309',
                border: '1px solid #fde68a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                fontWeight: '700',
                padding: '10px'
              }}
              title="admin@flavorcraft.com (Admin Role)"
            >
              <Crown size={15} />
              <span>Admin Demo</span>
            </button>

            <button
              onClick={() => handleDemo('user')}
              className="btn btn-sm"
              style={{
                background: '#fff7ed',
                color: '#ea580c',
                border: '1px solid #fed7aa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                fontWeight: '700',
                padding: '10px'
              }}
              title="chef@flavorcraft.com (User Role)"
            >
              <ChefHat size={15} />
              <span>User Demo</span>
            </button>
          </div>
          <button
            onClick={() => handleDemo('user')}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.8rem',
              cursor: 'pointer',
              textAlign: 'center',
              textDecoration: 'underline'
            }}
          >
            Or explore as Instant Guest Chef
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            style={{
              background: '#fee2e2',
              border: '1px solid #fca5a5',
              color: '#dc2626',
              padding: '10px 14px',
              borderRadius: '12px',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '1.25rem'
            }}
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', marginBottom: '6px' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '13px' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="chef@flavorcraft.com"
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-elevated)',
                  color: 'inherit',
                  fontSize: '0.95rem'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', marginBottom: '6px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '13px' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '12px 42px 12px 42px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-elevated)',
                  color: 'inherit',
                  fontSize: '0.95rem'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '12px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg"
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <span>Sign In to Kitchen</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Footer Link to Signup */}
        <div style={{ marginTop: '1.75rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Don't have an account yet?{' '}
          <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: '700', textDecoration: 'none' }}>
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
