import React from 'react';
import { useRecipes } from '../../context/RecipeContext';
import { RecipeCard } from './RecipeCard';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Favorites({ onOpenDetail, onOpenCookMode, onOpenAddToPlan }) {
  const { recipes, favorites } = useRecipes();

  const favoriteRecipes = recipes.filter((r) => favorites.includes(r.id));

  return (
    <div className="admin-container">
      <div
        style={{
          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
          color: '#ffffff',
          borderRadius: '24px',
          padding: '2.5rem',
          marginBottom: '2rem',
          boxShadow: '0 12px 30px rgba(239, 68, 68, 0.25)'
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.2)', padding: '6px 14px', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.75rem' }}>
          <Heart size={16} fill="#ffffff" /> Your Personal Cookbox
        </div>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', margin: '0 0 0.5rem 0' }}>Saved Favorites</h1>
        <p style={{ margin: 0, opacity: 0.9, maxWidth: '600px', lineHeight: '1.6' }}>
          All your treasured gourmet recipes in one convenient place. Quick access to cook mode, ingredients, and meal planning anytime.
        </p>
      </div>

      {favoriteRecipes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
          <Heart size={54} color="#ef4444" style={{ opacity: 0.3, margin: '0 auto 1.5rem auto' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>No favorites saved yet</h2>
          <p style={{ maxWidth: '420px', margin: '0 auto 1.5rem auto', lineHeight: '1.6' }}>
            Browse the recipe catalog and tap the heart icon on any recipe to save it here for fast cooking.
          </p>
          <Link to="/" className="btn btn-primary">
            Explore Recipes
          </Link>
        </div>
      ) : (
        <div className="recipe-grid">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onOpenDetail={onOpenDetail}
              onOpenCookMode={onOpenCookMode}
              onOpenAddToPlan={onOpenAddToPlan}
            />
          ))}
        </div>
      )}
    </div>
  );
}
