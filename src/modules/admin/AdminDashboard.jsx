import React, { useState } from 'react';
import { useRecipes } from '../../context/RecipeContext';
import { useAuth } from '../../context/AuthContext';
import { AdminRecipeModal } from './AdminRecipeModal';
import {
  UtensilsCrossed,
  Users,
  Heart,
  Globe,
  Plus,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Database
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function AdminDashboard() {
  const { recipes, favorites, addRecipe } = useRecipes();
  const { users } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  // Stats calculation
  const totalRecipes = recipes.length;
  const totalUsers = users.length;
  const totalFavorites = favorites.length;

  const cuisines = Array.from(new Set(recipes.map((r) => r.cuisine).filter(Boolean)));
  const categories = Array.from(new Set(recipes.map((r) => r.category).filter(Boolean)));

  // Category counts
  const categoryCounts = categories.map((cat) => ({
    name: cat,
    count: recipes.filter((r) => r.category === cat).length
  }));

  const handleSaveRecipe = (newRecipe) => {
    addRecipe(newRecipe);
    alert('🎉 Recipe published successfully!');
  };

  return (
    <div>
      {/* Metrics Row */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: '#fff7ed', color: '#f97316' }}>
            <UtensilsCrossed size={28} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Total Recipes
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '800' }}>{totalRecipes}</div>
            <div style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <TrendingUp size={14} /> Active Catalog
            </div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: '#e0f2fe', color: '#0284c7' }}>
            <Users size={28} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Registered Users
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '800' }}>{totalUsers}</div>
            <div style={{ fontSize: '0.8rem', color: '#0284c7' }}>
              LocalStorage Auth
            </div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: '#fee2e2', color: '#ef4444' }}>
            <Heart size={28} fill="#ef4444" />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Favorites Saved
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '800' }}>{totalFavorites}</div>
            <div style={{ fontSize: '0.8rem', color: '#ef4444' }}>
              User Engagement
            </div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: '#ecfdf5', color: '#059669' }}>
            <Globe size={28} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Global Cuisines
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '800' }}>{cuisines.length}</div>
            <div style={{ fontSize: '0.8rem', color: '#059669' }}>
              {categories.length} Categories
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions & Storage Health */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Quick Actions Card */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '20px', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0 0 1rem 0' }}>
            Quick Admin Actions
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={() => setModalOpen(true)}
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '0.85rem' }}
            >
              <Plus size={18} />
              <span>Create New Gourmet Recipe</span>
            </button>

            <Link
              to="/admin/recipes"
              className="btn btn-secondary"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none', padding: '0.85rem' }}
            >
              <UtensilsCrossed size={18} />
              <span>Manage Existing Recipes (Edit / Delete)</span>
            </Link>

            <Link
              to="/admin/users"
              className="btn btn-ghost"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none', border: '1px solid var(--border-subtle)', padding: '0.85rem' }}
            >
              <Users size={18} />
              <span>Manage User Roles & Permissions</span>
            </Link>
          </div>
        </div>

        {/* Database & Architecture Summary */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '20px', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Database size={20} color="#f97316" /> System Architecture & Storage
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
              <CheckCircle2 size={18} color="#10b981" />
              <span><strong>Frontend Core:</strong> React 18 + Vite (Production Optimized)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
              <CheckCircle2 size={18} color="#10b981" />
              <span><strong>Auth Engine:</strong> LocalStorage persistent sessions & role guards</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
              <CheckCircle2 size={18} color="#10b981" />
              <span><strong>Deployment Ready:</strong> Vercel SPA routing (`vercel.json`)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
              <CheckCircle2 size={18} color="#10b981" />
              <span><strong>Audio & Effects:</strong> Web Audio API + HTML5 Canvas Confetti</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown Table */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '20px', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0 0 1rem 0' }}>
          Recipe Category Distribution
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          {categoryCounts.map((cat) => (
            <div
              key={cat.name}
              style={{
                background: 'var(--bg-elevated)',
                padding: '12px 16px',
                borderRadius: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <span style={{ fontWeight: '700' }}>{cat.name}</span>
              <span style={{ background: '#f97316', color: '#fff', padding: '2px 10px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: '800' }}>
                {cat.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AdminRecipeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveRecipe}
        initialData={null}
      />
    </div>
  );
}
