import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  ShieldCheck,
  LayoutDashboard,
  UtensilsCrossed,
  Users,
  ExternalLink,
  Crown
} from 'lucide-react';
import '../../admin.css';

export function AdminLayout() {
  const { currentUser } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/admin', label: 'Analytics & Overview', icon: LayoutDashboard, exact: true },
    { path: '/admin/recipes', label: 'Manage Recipes (CRUD)', icon: UtensilsCrossed },
    { path: '/admin/users', label: 'Registered Users', icon: Users }
  ];

  return (
    <div className="admin-container">
      {/* Admin Header Banner */}
      <div className="admin-header-banner">
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(245, 158, 11, 0.2)', border: '1px solid rgba(245, 158, 11, 0.4)', color: '#fbbf24', padding: '6px 14px', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.75rem' }}>
            <Crown size={15} /> Administrator Control Center
          </div>
          <h1 className="admin-header-title">
            <ShieldCheck size={32} color="#f59e0b" />
            <span>FlavorCraft Admin Console</span>
          </h1>
          <p style={{ margin: 0, opacity: 0.85, fontSize: '0.95rem' }}>
            Welcome, <strong>{currentUser?.name}</strong>. Full privileges to manage recipes, curate culinary content, and monitor user accounts.
          </p>
        </div>

        <Link
          to="/"
          className="btn btn-secondary"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            fontWeight: '700'
          }}
        >
          <span>Exit to Customer View</span>
          <ExternalLink size={16} />
        </Link>
      </div>

      {/* Admin Nav Tabs */}
      <div className="admin-nav-tabs">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact
            ? location.pathname === item.path
            : location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-tab-btn ${isActive ? 'active' : ''}`}
              style={{ textDecoration: 'none' }}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Nested Page Render */}
      <Outlet />
    </div>
  );
}
