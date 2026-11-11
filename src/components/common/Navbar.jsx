import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useRecipes } from '../../context/RecipeContext';
import { soundManager } from '../audio/soundEffects';
import {
  UtensilsCrossed,
  Compass,
  CalendarDays,
  Refrigerator,
  ShoppingCart,
  Heart,
  Shield,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  User,
  LogOut,
  ChevronDown,
  Sparkles,
<<<<<<< HEAD
  ArrowRightLeft,
  MoreHorizontal
=======
  ArrowRightLeft
>>>>>>> 467d0be7e5a9d1e75671d57f5bd434a339e2bf77
} from 'lucide-react';

export function Navbar() {
  const { currentUser, isAdmin, logout, switchRole } = useAuth();
  const { favorites, shoppingList } = useRecipes();
  const location = useLocation();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(() => localStorage.getItem('flavorcraft_theme') || 'light');
  const [soundEnabled, setSoundEnabled] = useState(soundManager.enabled);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('flavorcraft_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    soundManager.play('pop');
  };

  const toggleSound = () => {
    const next = soundManager.toggleSound();
    setSoundEnabled(next);
  };

  const uncompletedShopCount = shoppingList.filter((item) => !item.completed).length;

  return (
    <header className="header-glass sticky-header">
      <div className="header-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={() => soundManager.play('pop')}>
          <div className="logo-icon-wrapper">
            <UtensilsCrossed className="logo-chef-hat" size={24} />
          </div>
          <div className="brand-text">
            <span className="brand-name">
              Flavor<span className="brand-highlight">Craft</span>
            </span>
            <span className="brand-tagline">Gourmet Recipe Studio</span>
          </div>
        </Link>

        {/* Navigation Tabs */}
<<<<<<< HEAD
        <nav className="nav-links" aria-label="Main Navigation">
=======
        <nav className="nav-tabs" aria-label="Main Navigation">
>>>>>>> 467d0be7e5a9d1e75671d57f5bd434a339e2bf77
          <Link
            to="/"
            className={`nav-btn ${location.pathname === '/' ? 'active' : ''}`}
            onClick={() => soundManager.play('pop')}
          >
            <Compass size={18} />
            <span>Explore</span>
          </Link>

          <Link
            to="/planner"
            className={`nav-btn ${location.pathname === '/planner' ? 'active' : ''}`}
            onClick={() => soundManager.play('pop')}
          >
            <CalendarDays size={18} />
            <span>Meal Planner</span>
          </Link>

          <Link
            to="/pantry"
            className={`nav-btn ${location.pathname === '/pantry' ? 'active' : ''}`}
            onClick={() => soundManager.play('pop')}
          >
            <Refrigerator size={18} />
            <span>Pantry Finder</span>
          </Link>

          <Link
            to="/shopping"
            className={`nav-btn ${location.pathname === '/shopping' ? 'active' : ''}`}
            onClick={() => soundManager.play('pop')}
          >
            <ShoppingCart size={18} />
            <span>Groceries</span>
            {uncompletedShopCount > 0 && (
              <span className="nav-badge">{uncompletedShopCount}</span>
            )}
          </Link>

          <Link
            to="/favorites"
            className={`nav-btn ${location.pathname === '/favorites' ? 'active' : ''}`}
            onClick={() => soundManager.play('pop')}
          >
            <Heart size={18} />
            <span>Favorites</span>
            {favorites.length > 0 && (
              <span className="nav-badge">{favorites.length}</span>
            )}
          </Link>

          {/* Admin Navigation Button */}
          {isAdmin && (
            <Link
              to="/admin"
              className={`nav-btn ${location.pathname.startsWith('/admin') ? 'active' : ''}`}
              style={{
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(249, 115, 22, 0.15))',
                borderColor: '#f59e0b',
                color: '#d97706',
                fontWeight: '700'
              }}
              onClick={() => soundManager.play('pop')}
            >
              <Shield size={18} />
              <span>Admin Console</span>
            </Link>
          )}
        </nav>

        {/* Right Action Icons & Profile */}
        <div className="header-actions">
          {/* Quick Demo Role Switcher */}
          <button
            onClick={() => {
              const nextRole = isAdmin ? 'user' : 'admin';
              switchRole(nextRole);
            }}
            className="btn btn-sm"
            style={{
              background: isAdmin ? '#fef3c7' : '#e0f2fe',
              color: isAdmin ? '#b45309' : '#0369a1',
              border: `1px solid ${isAdmin ? '#fde68a' : '#bae6fd'}`,
              borderRadius: '9999px',
              fontWeight: '700',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0.35rem 0.75rem'
            }}
            title="Click to instantly toggle between Admin & User role for testing"
          >
            <ArrowRightLeft size={14} />
            <span>Role: {isAdmin ? 'ADMIN' : 'USER'}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="icon-btn"
            title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="icon-btn"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* User Profile Dropdown */}
          {currentUser ? (
            <div style={{ position: 'relative' }}>
              <button
                className="user-profile-btn"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="user-avatar"
                />
                <span className="user-name">{currentUser.name.split(' ')[0]}</span>
                <ChevronDown size={14} />
              </button>

              {profileOpen && (
                <div
                  className="user-dropdown-menu open"
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '110%',
                    width: '260px',
                    zIndex: 1000
                  }}
                  onMouseLeave={() => setProfileOpen(false)}
                >
                  <div className="user-dropdown-header">
                    <div style={{ fontWeight: '700', fontSize: '1rem' }}>{currentUser.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{currentUser.email}</div>
                    <div style={{ marginTop: '0.5rem' }}>
                      <span className={`admin-role-badge ${currentUser.role}`}>
                        {currentUser.role === 'admin' ? '👑 Admin' : '👨‍🍳 Home Chef'}
                      </span>
                    </div>
                  </div>

                  <div className="user-dropdown-divider" />

                  {isAdmin ? (
                    <Link
                      to="/admin"
                      className="user-dropdown-item"
                      onClick={() => setProfileOpen(false)}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <Shield size={16} />
                      <span>Admin Dashboard</span>
                    </Link>
                  ) : (
                    <button
                      className="user-dropdown-item"
                      onClick={() => {
                        switchRole('admin');
                        setProfileOpen(false);
                      }}
                    >
                      <Sparkles size={16} />
                      <span>Switch to Admin Mode</span>
                    </button>
                  )}

                  <button
                    className="user-dropdown-item text-danger"
                    onClick={() => {
                      logout();
                      setProfileOpen(false);
                      navigate('/login');
                    }}
                  >
                    <LogOut size={16} />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
