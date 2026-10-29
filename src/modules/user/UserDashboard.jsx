import React, { useState, useMemo } from 'react';
import { useRecipes } from '../../context/RecipeContext';
import { useAuth } from '../../context/AuthContext';
import { soundManager } from '../../components/audio/soundEffects';
import { triggerConfetti } from '../../components/common/Confetti';
import { RecipeCard } from './RecipeCard';
import {
  Search,
  X,
  Dices,
  Sparkles,
  Flame,
  ChefHat,
  Crown,
  Clock,
  Eye,
  Utensils
} from 'lucide-react';

export function UserDashboard({ onOpenDetail, onOpenCookMode, onOpenAddToPlan }) {
  const {
    recipes,
    searchQuery,
    setSearchQuery,
    activeMood,
    setActiveMood,
    activeCategory,
    setActiveCategory,
    activeCuisine,
    setActiveCuisine,
    activeDifficulty,
    setActiveDifficulty,
    activeSort,
    setActiveSort
  } = useRecipes();

  const { currentUser } = useAuth();

  // Dynamic Time Greeting
  const hour = new Date().getHours();
  let timeGreeting = '☀️ Good Afternoon';
  if (hour >= 5 && hour < 12) timeGreeting = '🌅 Good Morning';
  else if (hour >= 12 && hour < 17) timeGreeting = '☀️ Good Afternoon';
  else timeGreeting = '🌙 Good Evening';

  const quotes = [
    '"Cooking is love made visible." ✨',
    '"Good food is the foundation of genuine happiness." 🍲',
    '"A recipe has no soul. You, as the cook, must bring soul to the recipe." 👨‍🍳',
    '"Food is our common ground, a universal experience." 🌍'
  ];
  const randomQuote = quotes[Math.floor(quotes.length / 2)];

  // Spotlight Recipe
  const spotlightRecipe = recipes.find((r) => r.id === 'indian-1') || recipes[0];

  const moodPills = [
    { key: 'all', emoji: '✨', label: 'All Vibes' },
    { key: 'quick', emoji: '⚡', label: 'Quick (<25m)' },
    { key: 'desi', emoji: '🇮🇳', label: 'Desi Flavors' },
    { key: 'comfort', emoji: '🍲', label: 'Comfort Food' },
    { key: 'healthy', emoji: '🥗', label: 'Healthy & Light' },
    { key: 'sweet', emoji: '🍰', label: 'Sweet Cravings' }
  ];

  const categories = [
    'all', 'Chicken', 'Vegetarian', 'Breakfast', 'Rice', 'Dessert', 'Curry', 'Pasta', 'Seafood'
  ];

  const cuisines = [
    'all', 'Indian', 'Italian', 'Mexican', 'Japanese', 'American', 'Thai'
  ];

  // Surprise Me Handler
  const handleSurpriseMe = () => {
    soundManager.play('success');
    triggerConfetti(80);
    const random = recipes[Math.floor(Math.random() * recipes.length)];
    if (random) onOpenDetail(random);
  };

  // Filter & Sort Recipes
  const filteredRecipes = useMemo(() => {
    const query = (searchQuery || '').trim().toLowerCase();

    return recipes
      .filter((r) => {
        if (!r) return false;

        // Search query
        if (query) {
          const titleMatch = (r.title || '').toLowerCase().includes(query);
          const categoryMatch = (r.category || '').toLowerCase().includes(query);
          const cuisineMatch = (r.cuisine || '').toLowerCase().includes(query);
          const descMatch = (r.description || '').toLowerCase().includes(query);
          const tagMatch = Array.isArray(r.tags) && r.tags.some((t) => (t || '').toLowerCase().includes(query));
          const ingredientMatch = Array.isArray(r.ingredients) && r.ingredients.some((ing) => {
            const itemText = typeof ing === 'string' ? ing : ing.item || ing.name || '';
            return itemText.toLowerCase().includes(query);
          });
          if (!titleMatch && !categoryMatch && !cuisineMatch && !descMatch && !tagMatch && !ingredientMatch) {
            return false;
          }
        }

        // Mood Filter (applied when no explicit search)
        if (activeMood !== 'all' && !query) {
          const totalTime = (r.prepTime || 15) + (r.cookTime || 20);
          const cuisineLower = (r.cuisine || '').toLowerCase();
          const catLower = (r.category || '').toLowerCase();

          if (activeMood === 'quick' && totalTime > 25) return false;
          if (activeMood === 'desi' && cuisineLower !== 'indian') return false;
          if (activeMood === 'sweet' && catLower !== 'dessert') return false;
          if (activeMood === 'healthy' && catLower !== 'vegetarian' && (r.calories || 500) > 450) return false;
          if (activeMood === 'comfort' && !['curry', 'pasta', 'chicken', 'rice'].includes(catLower)) return false;
        }

        // Category Filter
        if (activeCategory !== 'all' && !query) {
          const rCat = (r.category || '').toLowerCase();
          const target = activeCategory.toLowerCase();
          const tagMatch = Array.isArray(r.tags) && r.tags.some((t) => (t || '').toLowerCase() === target);
          if (rCat !== target && !tagMatch) return false;
        }

        // Cuisine Filter
        if (activeCuisine !== 'all' && !query) {
          if ((r.cuisine || '').toLowerCase() !== activeCuisine.toLowerCase()) return false;
        }

        // Difficulty Filter
        if (activeDifficulty !== 'all' && !query) {
          if ((r.difficulty || '').toLowerCase() !== activeDifficulty.toLowerCase()) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (activeSort === 'quickest') {
          return ((a.prepTime || 0) + (a.cookTime || 0)) - ((b.prepTime || 0) + (b.cookTime || 0));
        }
        if (activeSort === 'calories-low') {
          return (a.calories || 0) - (b.calories || 0);
        }
        if (activeSort === 'alphabetical') {
          return (a.title || '').localeCompare(b.title || '');
        }
        return 0; // recommended default
      });
  }, [recipes, searchQuery, activeMood, activeCategory, activeCuisine, activeDifficulty, activeSort]);

  return (
    <div className="admin-container" style={{ paddingTop: '1rem' }}>
      {/* Cheerful Dynamic Greeting Bar */}
      <div className="welcome-greeting-bar">
        <div className="greeting-text-box">
          <span className="greeting-time-badge">{timeGreeting}</span>
          <h2 className="greeting-user-heading">
            Welcome back, <span className="gradient-text">{currentUser ? currentUser.name.split(' ')[0] : 'Chef'}!</span>
          </h2>
          <p className="greeting-quote">{randomQuote}</p>
        </div>
        <div className="greeting-stats-chips">
          <div className="stat-chip">
            <ChefHat size={16} />
            <span>{recipes.length}+ Recipes</span>
          </div>
          <div className="stat-chip">
            <Flame size={16} color="#f97316" />
            <span>Daily Streak 🔥</span>
          </div>
        </div>
      </div>

      {/* Chef's Spotlight Banner */}
      {spotlightRecipe && !searchQuery && (
        <section className="spotlight-banner">
          <div className="spotlight-card">
            <div className="spotlight-badge-row">
              <span className="spotlight-badge">
                <Crown size={15} /> Chef's Daily Spotlight
              </span>
              <span className="spotlight-time-tag">
                ⏱️ {(spotlightRecipe.prepTime || 15) + (spotlightRecipe.cookTime || 25)} mins
              </span>
            </div>
            <div className="spotlight-body">
              <div className="spotlight-text">
                <h3 className="spotlight-title">{spotlightRecipe.title}</h3>
                <p className="spotlight-desc">{spotlightRecipe.description}</p>
                <div className="spotlight-actions">
                  <button
                    className="btn btn-primary btn-glow"
                    onClick={() => onOpenCookMode(spotlightRecipe)}
                  >
                    <Utensils size={18} /> Cook This Today
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => onOpenDetail(spotlightRecipe)}
                  >
                    <Eye size={18} /> Quick View
                  </button>
                </div>
              </div>
              <div className="spotlight-image-box">
                <img src={spotlightRecipe.image} alt={spotlightRecipe.title} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Hero Search Box */}
      <section className="hero-banner" style={{ marginTop: '1.5rem' }}>
        <div className="hero-content">
          <h1 className="hero-title">
            What are you craving to <span className="gradient-text">cook today?</span>
          </h1>
          <p className="hero-subtitle">
            Search delicious recipes, scale ingredients for any party size, and cook step-by-step with zero hassle.
          </p>

          <div className="search-box-wrapper">
            <div className="search-box">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dish name, ingredient (e.g. Biryani, Paneer, Chicken, Dosa, Pasta)..."
                autoComplete="off"
              />
              {searchQuery && (
                <button
                  className="clear-btn"
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="hero-quick-actions">
              <button
                className="surprise-btn"
                onClick={handleSurpriseMe}
                title="Discover a random delicious dish with celebratory confetti!"
              >
                <Dices size={18} />
                <span>Surprise Me! 🎉</span>
              </button>

              <div className="trending-tags">
                <span className="trend-label">
                  <Flame size={14} /> Popular:
                </span>
                {['Biryani', 'Paneer', 'Chicken', 'Dosa', 'Pasta'].map((tag) => (
                  <button
                    key={tag}
                    className="trend-pill"
                    onClick={() => {
                      setSearchQuery(tag);
                      soundManager.play('pop');
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mood & Craving Filter Carousel */}
      <section className="mood-selector-section">
        <div className="mood-header">
          <span className="mood-title">
            <Sparkles size={18} color="#f59e0b" /> What's your cooking vibe today?
          </span>
          <span className="mood-hint">Tap any mood to filter instantly</span>
        </div>
        <div className="mood-pills-carousel">
          {moodPills.map(({ key, emoji, label }) => (
            <button
              key={key}
              className={`mood-pill ${activeMood === key ? 'active' : ''}`}
              onClick={() => {
                setActiveMood(key);
                soundManager.play('pop');
              }}
            >
              <span className="mood-emoji">{emoji}</span>
              <span className="mood-text">{label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Category Filter Pills & Dropdowns */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div className="category-pills-scroll" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(cat);
                soundManager.play('pop');
              }}
            >
              {cat === 'all' ? 'All Dishes' : cat}
            </button>
          ))}
        </div>

        {/* Dropdowns */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <select
            value={activeCuisine}
            onChange={(e) => setActiveCuisine(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-surface)',
              color: 'inherit',
              fontWeight: '600',
              fontSize: '0.85rem'
            }}
          >
            <option value="all">🌍 All Cuisines</option>
            {cuisines.filter((c) => c !== 'all').map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={activeDifficulty}
            onChange={(e) => setActiveDifficulty(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-surface)',
              color: 'inherit',
              fontWeight: '600',
              fontSize: '0.85rem'
            }}
          >
            <option value="all">⚡ All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select
            value={activeSort}
            onChange={(e) => setActiveSort(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-surface)',
              color: 'inherit',
              fontWeight: '600',
              fontSize: '0.85rem'
            }}
          >
            <option value="recommended">⭐ Recommended</option>
            <option value="quickest">⏱️ Quickest Cooking</option>
            <option value="calories-low">🔥 Lowest Calories</option>
            <option value="alphabetical">🔤 Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Results Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>
          {searchQuery ? `Results for "${searchQuery}"` : 'Explore Gourmet Recipes'}
        </h2>
        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>
          Showing {filteredRecipes.length} dishes
        </span>
      </div>

      {/* Recipe Grid */}
      {filteredRecipes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--bg-surface)', borderRadius: '24px', border: '1px solid var(--border-subtle)' }}>
          <ChefHat size={48} color="#f97316" style={{ opacity: 0.4, margin: '0 auto 1rem auto' }} />
          <h3 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '0.5rem' }}>No recipes found</h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 1.5rem auto' }}>
            We couldn't find any dishes matching your filters. Try clearing your search query or choosing another cuisine.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveMood('all');
              setActiveCategory('all');
              setActiveCuisine('all');
              setActiveDifficulty('all');
              soundManager.play('pop');
            }}
            className="btn btn-secondary"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="recipe-grid">
          {filteredRecipes.map((recipe) => (
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
