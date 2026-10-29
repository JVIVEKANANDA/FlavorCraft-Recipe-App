import React, { useState, useEffect } from 'react';
import { useRecipes } from '../../context/RecipeContext';
import { soundManager } from '../../components/audio/soundEffects';
import { triggerConfetti } from '../../components/common/Confetti';
import {
  X,
  Clock,
  Flame,
  Users,
  ChefHat,
  Heart,
  CalendarPlus,
  ShoppingCart,
  Star,
  CheckCircle,
  Play,
  Pause,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export function RecipeDetailModal({ recipe, onClose, onLaunchCookMode, onOpenAddToPlan }) {
  const { favorites, toggleFavorite, ratings, rateRecipe, notes, saveNote, addShoppingItem } = useRecipes();

  const [servings, setServings] = useState(recipe?.servings || 4);
  const baseServings = recipe?.servings || 4;
  const multiplier = servings / baseServings;

  const [checkedIngredients, setCheckedIngredients] = useState(new Set());
  const [personalNote, setPersonalNote] = useState('');
  const [activeRating, setActiveRating] = useState(5);

  // Timer state
  const [timerSeconds, setTimerSeconds] = useState((recipe?.cookTime || 20) * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    if (recipe) {
      setServings(recipe.servings || 4);
      setCheckedIngredients(new Set());
      setPersonalNote(notes[recipe.id] || '');
      setActiveRating(ratings[recipe.id] || 5);
      setTimerSeconds((recipe.cookTime || 20) * 60);
      setTimerRunning(false);
    }
  }, [recipe, notes, ratings]);

  useEffect(() => {
    let interval = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
      soundManager.play('success');
      triggerConfetti(60);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  if (!recipe) return null;

  const isFav = favorites.includes(recipe.id);
  const totalTime = (recipe.prepTime || 15) + (recipe.cookTime || 20);

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleIngredientToggle = (idx) => {
    setCheckedIngredients((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else {
        next.add(idx);
        soundManager.play('pop');
      }
      return next;
    });
  };

  const handleExportIngredientsToShopping = () => {
    if (!recipe.ingredients) return;
    recipe.ingredients.forEach((ing) => {
      const itemText = typeof ing === 'string' ? ing : `${(ing.amount ? ing.amount * multiplier : '').toFixed(1).replace('.0', '')} ${ing.unit || ''} ${ing.item || ''}`.trim();
      addShoppingItem(recipe.title, itemText);
    });
    soundManager.play('success');
    triggerConfetti(50);
  };

  return (
    <div className="modal-backdrop active" onClick={onClose}>
      <div
        className="modal-container recipe-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '850px', maxHeight: '90vh', overflowY: 'auto' }}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Hero Image & Header */}
        <div style={{ position: 'relative', margin: '-2rem -2rem 1.5rem -2rem', height: '320px', overflow: 'hidden' }}>
          <img
            src={recipe.image || 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80'}
            alt={recipe.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '2rem'
            }}
          >
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className="card-cuisine-tag" style={{ position: 'static' }}>{recipe.cuisine || 'International'}</span>
              <span className="card-category" style={{ background: '#f97316', color: '#fff', padding: '4px 12px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: '700' }}>
                {recipe.category || 'Gourmet'}
              </span>
            </div>
            <h2 style={{ color: '#fff', fontSize: '2rem', fontWeight: '800', margin: '0 0 0.5rem 0' }}>{recipe.title}</h2>
            <p style={{ color: '#fed7aa', margin: 0, fontSize: '0.95rem', maxWidth: '650px' }}>{recipe.description}</p>
          </div>
        </div>

        {/* Quick Meta Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={18} color="#f97316" />
              <span><strong>{totalTime}</strong> mins total</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Flame size={18} color="#ef4444" />
              <span><strong>{recipe.calories || 480}</strong> kcal</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ChefHat size={18} color="#10b981" />
              <span><strong>{recipe.difficulty || 'Easy'}</strong></span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => toggleFavorite(recipe.id)}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Heart size={16} fill={isFav ? '#ef4444' : 'none'} color={isFav ? '#ef4444' : 'currentColor'} />
              <span>{isFav ? 'Saved' : 'Favorite'}</span>
            </button>
            <button
              onClick={() => onOpenAddToPlan(recipe)}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <CalendarPlus size={16} />
              <span>Meal Plan</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onLaunchCookMode(recipe);
              }}
              className="btn btn-primary btn-sm btn-glow"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <ChefHat size={16} />
              <span>Focus Cook Mode</span>
            </button>
          </div>
        </div>

        {/* Servings Scaler & Kitchen Timer Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
          {/* Servings Multiplier */}
          <div style={{ background: 'var(--bg-elevated)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Users size={18} color="#f97316" /> Dynamic Servings Scaler
              </span>
              <span style={{ fontWeight: '800', color: '#f97316', fontSize: '1.2rem' }}>{servings} Servings</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setServings(Math.max(1, servings - 1))}
                style={{ flex: 1, fontWeight: '800' }}
              >
                -
              </button>
              {[1, 2, 4, 6].map((s) => (
                <button
                  key={s}
                  onClick={() => setServings(s)}
                  className={`btn btn-sm ${servings === s ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ flex: 1 }}
                >
                  {s}x
                </button>
              ))}
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setServings(servings + 1)}
                style={{ flex: 1, fontWeight: '800' }}
              >
                +
              </button>
            </div>
          </div>

          {/* Interactive Cooking Timer */}
          <div style={{ background: 'var(--bg-elevated)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '4px' }}>Kitchen Timer</div>
              <div style={{ fontSize: '1.85rem', fontWeight: '800', fontFamily: 'monospace', color: timerRunning ? '#f97316' : 'inherit' }}>
                {formatTimer(timerSeconds)}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => {
                  setTimerRunning(!timerRunning);
                  soundManager.play('pop');
                }}
                className={`btn btn-sm ${timerRunning ? 'btn-secondary' : 'btn-primary'}`}
              >
                {timerRunning ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button
                onClick={() => {
                  setTimerRunning(false);
                  setTimerSeconds((recipe.cookTime || 20) * 60);
                  soundManager.play('pop');
                }}
                className="btn btn-ghost btn-sm"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Ingredients & Instructions Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          {/* Ingredients Column */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0 }}>
                Ingredients ({recipe.ingredients?.length || 0})
              </h3>
              <button
                onClick={handleExportIngredientsToShopping}
                className="btn btn-ghost btn-sm"
                style={{ fontSize: '0.8rem', color: '#f97316', display: 'flex', alignItems: 'center', gap: '4px' }}
                title="Add all ingredients to Grocery List"
              >
                <ShoppingCart size={14} />
                <span>+ To Groceries</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {recipe.ingredients?.map((ing, idx) => {
                const isChecked = checkedIngredients.has(idx);
                let amountText = '';
                let unitText = '';
                let itemText = '';

                if (typeof ing === 'string') {
                  itemText = ing;
                } else {
                  amountText = ing.amount ? (ing.amount * multiplier).toFixed(1).replace('.0', '') : '';
                  unitText = ing.unit || '';
                  itemText = ing.item || ing.name || '';
                }

                return (
                  <div
                    key={idx}
                    onClick={() => handleIngredientToggle(idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 12px',
                      borderRadius: '10px',
                      background: isChecked ? 'var(--primary-light)' : 'var(--bg-elevated)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <CheckCircle
                      size={18}
                      color={isChecked ? '#f97316' : 'var(--text-muted)'}
                      fill={isChecked ? '#fff7ed' : 'none'}
                    />
                    <span
                      style={{
                        textDecoration: isChecked ? 'line-through' : 'none',
                        color: isChecked ? 'var(--text-muted)' : 'inherit',
                        fontSize: '0.95rem'
                      }}
                    >
                      {amountText && <strong>{amountText} </strong>}
                      {unitText && <span>{unitText} </span>}
                      <span>{itemText}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Instructions Column */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1rem' }}>
              Step-by-Step Instructions
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {recipe.instructions?.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '12px' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#f97316',
                      color: '#ffffff',
                      fontWeight: '800',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}
                  >
                    {idx + 1}
                  </div>
                  <p style={{ margin: 0, lineHeight: '1.6', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5-Star Rating & Personal Chef Notes */}
        <div style={{ background: 'var(--bg-elevated)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-subtle)', marginTop: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <span style={{ fontWeight: '700', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Star size={18} color="#f59e0b" fill="#f59e0b" /> Rate this Recipe:
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => {
                    setActiveRating(star);
                    rateRecipe(recipe.id, star);
                  }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                >
                  <Star
                    size={24}
                    color="#f59e0b"
                    fill={star <= activeRating ? '#f59e0b' : 'none'}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '600', fontSize: '0.9rem', marginBottom: '6px', color: 'var(--text-secondary)' }}>
              Personal Chef Notes & Secret Tweaks:
            </label>
            <textarea
              value={personalNote}
              onChange={(e) => {
                setPersonalNote(e.target.value);
                saveNote(recipe.id, e.target.value);
              }}
              placeholder="e.g. Added extra cardamom powder, cooked 5 minutes less for extra tenderness..."
              rows={3}
              style={{
                width: '100%',
                borderRadius: '12px',
                border: '1px solid var(--border-subtle)',
                padding: '10px 14px',
                background: 'var(--bg-surface)',
                color: 'inherit',
                fontSize: '0.9rem',
                resize: 'vertical'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
