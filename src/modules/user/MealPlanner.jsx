import React, { useState } from 'react';
import { useRecipes } from '../../context/RecipeContext';
import { soundManager } from '../../components/audio/soundEffects';
import { triggerConfetti } from '../../components/common/Confetti';
import {
  CalendarDays,
  Plus,
  Trash2,
  ShoppingCart,
  Clock,
  Flame,
  ChefHat,
  X,
  Sparkles
} from 'lucide-react';

export function MealPlanner({ onOpenDetail }) {
  const { mealPlan, addToMealPlan, removeFromMealPlan, exportMealPlanToGrocery, recipes } = useRecipes();

  // Slot selection modal state
  const [pickerModal, setPickerModal] = useState({ open: false, day: null, slot: null });
  const [pickerSearch, setPickerSearch] = useState('');

  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  const slots = [
    { key: 'breakfast', label: '🌅 Breakfast' },
    { key: 'lunch', label: '☀️ Lunch' },
    { key: 'dinner', label: '🌙 Dinner' }
  ];

  const handleOpenPicker = (day, slot) => {
    setPickerModal({ open: true, day, slot });
    setPickerSearch('');
    soundManager.play('pop');
  };

  const handleSelectRecipe = (recipe) => {
    addToMealPlan(pickerModal.day, pickerModal.slot, recipe);
    setPickerModal({ open: false, day: null, slot: null });
  };

  const handleExportWeek = () => {
    const count = exportMealPlanToGrocery();
    if (count > 0) {
      triggerConfetti(60);
      alert(`🎉 Success! Exported ${count} ingredients to your Grocery Shopping List!`);
    } else {
      alert('Your meal plan is empty! Add some dishes first.');
    }
  };

  const filteredRecipes = recipes.filter((r) =>
    (r.title || '').toLowerCase().includes(pickerSearch.toLowerCase()) ||
    (r.cuisine || '').toLowerCase().includes(pickerSearch.toLowerCase())
  );

  return (
    <div className="admin-container">
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #f97316, #ea580c)',
          color: '#ffffff',
          borderRadius: '24px',
          padding: '2.5rem',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          boxShadow: '0 12px 30px rgba(249, 115, 22, 0.25)'
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.2)', padding: '6px 14px', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.75rem' }}>
            <CalendarDays size={16} /> 7-Day Smart Kitchen Calendar
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', margin: '0 0 0.5rem 0' }}>Weekly Meal Planner</h1>
          <p style={{ margin: 0, opacity: 0.9, maxWidth: '580px', lineHeight: '1.6' }}>
            Organize breakfast, lunch, and dinner for the entire week. Scale portions, reduce food waste, and export ingredients straight to your grocery list in 1 click!
          </p>
        </div>

        <button
          onClick={handleExportWeek}
          className="btn btn-secondary btn-lg"
          style={{
            background: '#ffffff',
            color: '#ea580c',
            border: 'none',
            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: '800'
          }}
        >
          <ShoppingCart size={20} />
          <span>Export Week to Groceries</span>
        </button>
      </div>

      {/* Days Columns Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {days.map(({ key: dayKey, label: dayLabel }) => (
          <div
            key={dayKey}
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '20px',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>{dayLabel}</span>
              <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>
                {Object.values(mealPlan[dayKey] || {}).filter(Boolean).length}/3 Planned
              </span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {slots.map(({ key: slotKey, label: slotLabel }) => {
                const dish = mealPlan[dayKey]?.[slotKey];

                return (
                  <div
                    key={slotKey}
                    style={{
                      background: dish ? 'var(--primary-light)' : 'var(--bg-elevated)',
                      border: `1px solid ${dish ? 'var(--primary-border)' : 'var(--border-subtle)'}`,
                      borderRadius: '14px',
                      padding: '12px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>
                      {slotLabel}
                    </div>

                    {dish ? (
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <img
                          src={dish.image}
                          alt={dish.title}
                          style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover' }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4
                            onClick={() => onOpenDetail(dish)}
                            style={{
                              margin: '0 0 4px 0',
                              fontSize: '0.95rem',
                              fontWeight: '700',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              cursor: 'pointer',
                              color: 'var(--primary)'
                            }}
                          >
                            {dish.title}
                          </h4>
                          <div style={{ display: 'flex', gap: '10px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            <span>⏱️ {(dish.prepTime || 10) + (dish.cookTime || 20)}m</span>
                            <span>🔥 {dish.calories || 450} kcal</span>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromMealPlan(dayKey, slotKey)}
                          style={{
                            background: '#fee2e2',
                            color: '#ef4444',
                            border: 'none',
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          title="Remove from slot"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleOpenPicker(dayKey, slotKey)}
                        style={{
                          width: '100%',
                          background: 'transparent',
                          border: '2px dashed var(--border-subtle)',
                          borderRadius: '10px',
                          padding: '12px',
                          color: 'var(--text-muted)',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <Plus size={16} />
                        <span>Plan a dish</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Pick Recipe Modal */}
      {pickerModal.open && (
        <div className="modal-backdrop active" onClick={() => setPickerModal({ open: false, day: null, slot: null })}>
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: '800' }}>
                Select Recipe for {pickerModal.day?.toUpperCase()} ({pickerModal.slot?.toUpperCase()})
              </h3>
              <button
                className="modal-close-btn"
                onClick={() => setPickerModal({ open: false, day: null, slot: null })}
              >
                <X size={20} />
              </button>
            </div>

            <input
              type="text"
              value={pickerSearch}
              onChange={(e) => setPickerSearch(e.target.value)}
              placeholder="Search by recipe name or cuisine..."
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-elevated)',
                color: 'inherit',
                marginBottom: '1rem',
                fontSize: '0.95rem'
              }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {filteredRecipes.slice(0, 10).map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => handleSelectRecipe(recipe)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-surface)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{recipe.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {recipe.cuisine} • {recipe.category} • {(recipe.prepTime || 10) + (recipe.cookTime || 20)} mins
                    </div>
                  </div>
                  <button className="btn btn-primary btn-sm">Add</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
