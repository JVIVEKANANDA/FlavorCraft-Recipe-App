import React, { useState } from 'react';
import { useRecipes } from '../../context/RecipeContext';
import { RecipeCard } from './RecipeCard';
import { Refrigerator, Plus, X, Sparkles, Check } from 'lucide-react';

export function PantryFinder({ onOpenDetail, onOpenCookMode, onOpenAddToPlan }) {
  const { pantryItems, addPantryItem, removePantryItem, recipes } = useRecipes();
  const [newIngredient, setNewIngredient] = useState('');

  const quickStaples = [
    'Chicken', 'Paneer', 'Basmati Rice', 'Potato', 'Onion',
    'Tomato', 'Garlic', 'Ginger', 'Yogurt', 'Ghee', 'Pasta', 'Egg'
  ];

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (newIngredient.trim()) {
      addPantryItem(newIngredient.trim());
      setNewIngredient('');
    }
  };

  // Compute Match % for all recipes
  const matchedRecipes = recipes
    .map((recipe) => {
      if (!recipe.ingredients || recipe.ingredients.length === 0) {
        return { ...recipe, matchScore: 0 };
      }

      let matchCount = 0;
      recipe.ingredients.forEach((ing) => {
        const itemText = (typeof ing === 'string' ? ing : ing.item || ing.name || '').toLowerCase();
        const hasMatch = pantryItems.some((pantryItem) =>
          itemText.includes(pantryItem.toLowerCase()) || pantryItem.toLowerCase().includes(itemText)
        );
        if (hasMatch) matchCount++;
      });

      const score = Math.round((matchCount / recipe.ingredients.length) * 100);
      return { ...recipe, matchScore: score };
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  return (
    <div className="admin-container">
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: '#ffffff',
          borderRadius: '24px',
          padding: '2.5rem',
          marginBottom: '2rem',
          boxShadow: '0 12px 30px rgba(16, 185, 129, 0.25)'
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.2)', padding: '6px 14px', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.75rem' }}>
          <Refrigerator size={16} /> Zero Food Waste Assistant
        </div>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', margin: '0 0 0.5rem 0' }}>What's in Your Fridge?</h1>
        <p style={{ margin: 0, opacity: 0.9, maxWidth: '650px', lineHeight: '1.6' }}>
          Add the ingredients you already have at home. FlavorCraft will rank dishes by how closely they match your fridge staples so you can whip up delicious meals without a grocery run!
        </p>
      </div>

      {/* Pantry Inputs & Chips */}
      <div
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '20px',
          padding: '1.75rem',
          marginBottom: '2.5rem',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '1rem' }}>
          Your Available Ingredients ({pantryItems.length})
        </h3>

        {/* Input Form */}
        <form onSubmit={handleAddCustom} style={{ display: 'flex', gap: '10px', marginBottom: '1.25rem' }}>
          <input
            type="text"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            placeholder="Type ingredient (e.g. Bell Pepper, Coconut Milk, Garam Masala)..."
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-elevated)',
              color: 'inherit',
              fontSize: '0.95rem'
            }}
          />
          <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Plus size={18} />
            <span>Add Item</span>
          </button>
        </form>

        {/* Pantry Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem' }}>
          {pantryItems.map((item, idx) => (
            <span
              key={idx}
              style={{
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                border: '1px solid var(--primary-border)',
                padding: '6px 14px',
                borderRadius: '9999px',
                fontWeight: '700',
                fontSize: '0.9rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>{item}</span>
              <X
                size={14}
                style={{ cursor: 'pointer' }}
                onClick={() => removePantryItem(item)}
              />
            </span>
          ))}
        </div>

        {/* Quick Staple Additions */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
            Quick Add Common Staples:
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {quickStaples.map((staple) => {
              const alreadyHas = pantryItems.some((p) => p.toLowerCase() === staple.toLowerCase());
              return (
                <button
                  key={staple}
                  onClick={() => (alreadyHas ? removePantryItem(staple) : addPantryItem(staple))}
                  className={`btn btn-sm ${alreadyHas ? 'btn-secondary' : 'btn-ghost'}`}
                  style={{ borderRadius: '9999px', fontSize: '0.8rem' }}
                >
                  {alreadyHas ? <Check size={12} /> : <Plus size={12} />}
                  <span>{staple}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Matched Recipe Results */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.65rem', fontWeight: '800', margin: 0 }}>
            Matching Recipes Ranked for You
          </h2>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Showing {matchedRecipes.length} dishes sorted by fridge match
          </span>
        </div>

        <div className="recipe-grid">
          {matchedRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onOpenDetail={onOpenDetail}
              onOpenCookMode={onOpenCookMode}
              onOpenAddToPlan={onOpenAddToPlan}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
