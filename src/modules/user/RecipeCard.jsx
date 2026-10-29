import React from 'react';
import { useRecipes } from '../../context/RecipeContext';
import { soundManager } from '../../components/audio/soundEffects';
import { Clock, Flame, Heart, ChefHat, CalendarPlus, Star } from 'lucide-react';

export function RecipeCard({ recipe, onOpenDetail, onOpenCookMode, onOpenAddToPlan }) {
  const { favorites, toggleFavorite, ratings } = useRecipes();

  const isFav = favorites.includes(recipe.id);
  const totalTime = (recipe.prepTime || 15) + (recipe.cookTime || 20);
  const diffClass = (recipe.difficulty || 'Easy').toLowerCase();
  const currentRating = ratings[recipe.id] || 5.0;

  return (
    <article className="recipe-card" onClick={() => onOpenDetail(recipe)}>
      <div className="recipe-card-media">
        <img
          className="recipe-img"
          src={recipe.image || 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80'}
          alt={recipe.title}
          loading="lazy"
        />
        <button
          className={`card-favorite-btn ${isFav ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(recipe.id);
          }}
          title={isFav ? 'Remove from favorites' : 'Save to favorites'}
          aria-label="Favorite"
        >
          <Heart size={18} fill={isFav ? '#ef4444' : 'none'} color={isFav ? '#ef4444' : '#ffffff'} />
        </button>

        {recipe.cuisine && (
          <span className="card-cuisine-tag">{recipe.cuisine}</span>
        )}
        {recipe.matchScore !== undefined && (
          <span className="match-score-badge">{recipe.matchScore}% Match</span>
        )}
      </div>

      <div className="recipe-card-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <span className="card-category">{recipe.category || 'Gourmet'}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontSize: '0.85rem', fontWeight: '700' }}>
            <Star size={14} fill="#f59e0b" color="#f59e0b" />
            <span>{currentRating}.0</span>
          </div>
        </div>

        <h3 className="card-title">{recipe.title}</h3>

        <div className="card-meta-row">
          <div className="card-meta-item" title="Total preparation & cooking time">
            <Clock size={15} />
            <span>{totalTime} mins</span>
          </div>
          <div className="card-meta-item" title="Estimated calories">
            <Flame size={15} />
            <span>{recipe.calories || 450} kcal</span>
          </div>
          <span className={`difficulty-pill ${diffClass}`}>{recipe.difficulty || 'Easy'}</span>
        </div>

        <div className="card-actions-bar" onClick={(e) => e.stopPropagation()}>
          <button
            className="card-action-btn btn-cook-mode"
            onClick={() => onOpenCookMode(recipe)}
            title="Step-by-Step Focus Cooking"
          >
            <ChefHat size={16} />
            <span>Cook Mode</span>
          </button>
          <button
            className="card-action-btn btn-add-plan"
            onClick={() => onOpenAddToPlan(recipe)}
            title="Add to Weekly Meal Plan"
          >
            <CalendarPlus size={16} />
            <span>Add to Plan</span>
          </button>
        </div>
      </div>
    </article>
  );
}
