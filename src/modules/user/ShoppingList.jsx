import React, { useState } from 'react';
import { useRecipes } from '../../context/RecipeContext';
import { soundManager } from '../../components/audio/soundEffects';
import {
  ShoppingCart,
  Plus,
  Trash2,
  CheckCircle,
  Copy,
  Check,
  Sparkles
} from 'lucide-react';

export function ShoppingList() {
  const {
    shoppingList,
    addShoppingItem,
    toggleShoppingItem,
    removeShoppingItem,
    clearCompletedShopping
  } = useRecipes();

  const [newItemText, setNewItemText] = useState('');
  const [recipeCategory, setRecipeCategory] = useState('');
  const [copied, setCopied] = useState(false);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItemText.trim()) {
      addShoppingItem(recipeCategory.trim() || 'General Staples', newItemText.trim());
      setNewItemText('');
      setRecipeCategory('');
    }
  };

  const handleCopyClipboard = () => {
    if (shoppingList.length === 0) return;
    const text = shoppingList
      .map((item) => `${item.completed ? '[x]' : '[ ]'} ${item.text} (${item.recipeTitle})`)
      .join('\n');
    navigator.clipboard.writeText(`🛒 FlavorCraft Grocery List:\n\n${text}`);
    setCopied(true);
    soundManager.play('success');
    setTimeout(() => setCopied(false), 2000);
  };

  // Group items by recipeTitle
  const grouped = shoppingList.reduce((acc, item) => {
    const key = item.recipeTitle || 'General Staples';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const totalItems = shoppingList.length;
  const completedCount = shoppingList.filter((i) => i.completed).length;

  return (
    <div className="admin-container" style={{ maxWidth: '900px' }}>
      {/* Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          color: '#ffffff',
          borderRadius: '24px',
          padding: '2.25rem',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          boxShadow: '0 12px 30px rgba(245, 158, 11, 0.25)'
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.2)', padding: '6px 14px', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.75rem' }}>
            <ShoppingCart size={16} /> Smart Kitchen Grocery List
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', margin: '0 0 0.5rem 0' }}>Grocery Shopping List</h1>
          <p style={{ margin: 0, opacity: 0.9, fontSize: '0.95rem' }}>
            {completedCount} of {totalItems} items checked off
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleCopyClipboard}
            className="btn btn-secondary"
            style={{ background: '#ffffff', color: '#b45309', border: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700' }}
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy List'}</span>
          </button>
          {completedCount > 0 && (
            <button
              onClick={clearCompletedShopping}
              className="btn btn-ghost"
              style={{ background: 'rgba(255,255,255,0.2)', color: '#ffffff' }}
            >
              Clear Checked
            </button>
          )}
        </div>
      </div>

      {/* Add Custom Item Box */}
      <div
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '1.25rem',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <form onSubmit={handleAddItem} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="Add grocery item (e.g. 500g Fresh Paneer, Coconut Milk, Coriander)..."
            style={{
              flex: '2 1 240px',
              padding: '10px 14px',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-elevated)',
              color: 'inherit'
            }}
          />
          <input
            type="text"
            value={recipeCategory}
            onChange={(e) => setRecipeCategory(e.target.value)}
            placeholder="Category or Dish (Optional)"
            style={{
              flex: '1 1 180px',
              padding: '10px 14px',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-elevated)',
              color: 'inherit'
            }}
          />
          <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Plus size={18} />
            <span>Add Item</span>
          </button>
        </form>
      </div>

      {/* Grouped List */}
      {totalItems === 0 ? (
        <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: 'var(--text-muted)' }}>
          <ShoppingCart size={48} style={{ opacity: 0.4, margin: '0 auto 1rem auto' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>Your grocery basket is empty!</h3>
          <p style={{ margin: 0, fontSize: '0.95rem' }}>
            Add items manually above, or open any recipe and tap <strong>"+ To Groceries"</strong> to automatically import ingredients.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {Object.entries(grouped).map(([recipeName, items]) => (
            <div
              key={recipeName}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '16px',
                padding: '1.25rem',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <h3 style={{ fontSize: '1.05rem', fontWeight: '800', margin: '0 0 1rem 0', color: 'var(--primary)' }}>
                {recipeName} ({items.length})
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      borderRadius: '10px',
                      background: item.completed ? 'var(--bg-elevated)' : 'transparent',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    <div
                      onClick={() => toggleShoppingItem(item.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        cursor: 'pointer',
                        flex: 1
                      }}
                    >
                      <CheckCircle
                        size={18}
                        color={item.completed ? '#10b981' : 'var(--text-muted)'}
                        fill={item.completed ? '#ecfdf5' : 'none'}
                      />
                      <span
                        style={{
                          textDecoration: item.completed ? 'line-through' : 'none',
                          color: item.completed ? 'var(--text-muted)' : 'inherit',
                          fontSize: '0.95rem'
                        }}
                      >
                        {item.text}
                      </span>
                    </div>

                    <button
                      onClick={() => removeShoppingItem(item.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: '4px'
                      }}
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
