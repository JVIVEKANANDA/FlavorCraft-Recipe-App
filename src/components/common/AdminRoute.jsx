import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, ArrowLeft, UserCheck } from 'lucide-react';

export function AdminRoute({ children }) {
  const { currentUser, isAdmin, switchRole } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          background: 'var(--card-bg, #ffffff)',
          border: '1px solid var(--border-color, #fed7aa)',
          borderRadius: '24px',
          padding: '3rem',
          maxWidth: '540px',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
        }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: '#fee2e2',
            color: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto'
          }}>
            <ShieldAlert size={36} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.75rem' }}>
            Admin Access Required
          </h2>
          <p style={{ color: 'var(--text-muted, #64748b)', lineHeight: '1.6', marginBottom: '2rem' }}>
            You are currently signed in as <strong>{currentUser.name}</strong> with the <strong>User</strong> role.
            The Admin Management Console is restricted to Administrator accounts.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              onClick={() => switchRole('admin')}
              style={{
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                color: '#fff',
                border: 'none',
                padding: '0.875rem 1.5rem',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <UserCheck size={20} />
              Switch Role to Admin (Demo Helper)
            </button>
            <Link
              to="/"
              style={{
                background: 'var(--btn-ghost, #f1f5f9)',
                color: 'var(--text-color, #1e293b)',
                textDecoration: 'none',
                padding: '0.875rem 1.5rem',
                borderRadius: '12px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <ArrowLeft size={18} />
              Return to User Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
