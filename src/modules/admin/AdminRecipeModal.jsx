import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Check, Sparkles } from 'lucide-react';
import { soundManager } from '../../components/audio/soundEffects';

export function AdminRecipeModal({ isOpen, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Chicken',
    cuisine: 'Indian',
    image: '',
    prepTime: 20,
    cookTime: 30,
    servings: 4,
    calories: 500,
    difficulty: 'Easy',
    description: '',
    tags: 'Indian, Gourmet',
    ingredients: [{ amount: 1, unit: 'tbsp', item: '' }],
    instructions: ['']
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        tags: Array.isArray(initialData.tags) ? initialData.tags.join(', ') : initialData.tags || '',
        ingredients: Array.isArray(initialData.ingredients) && initialData.ingredients.length > 0
          ? initialData.ingredients.map((ing) =>
              typeof ing === 'string' ? { amount: 1, unit: '', item: ing } : ing
            )
          : [{ amount: 1, unit: 'tbsp', item: '' }],
        instructions: Array.isArray(initialData.instructions) && initialData.instructions.length > 0
          ? initialData.instructions
          : ['']
      });
    } else {
      setFormData({
        title: '',
        category: 'Chicken',
        cuisine: 'Indian',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
        prepTime: 20,
        cookTime: 30,
        servings: 4,
        calories: 500,
        difficulty: 'Easy',
        description: '',
        tags: 'Curry, Gourmet',
        ingredients: [{ amount: 1, unit: 'cup', item: 'Fresh ingredients' }],
        instructions: ['Prepare the ingredients and heat pan on medium.']
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleIngredientChange = (idx, field, value) => {
    const updated = [...formData.ingredients];
    updated[idx] = { ...updated[idx], [field]: value };
    setFormData({ ...formData, ingredients: updated });
  };

  const handleAddIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { amount: 1, unit: '', item: '' }]
    });
  };

  const handleRemoveIngredient = (idx) => {
    if (formData.ingredients.length > 1) {
      setFormData({
        ...formData,
        ingredients: formData.ingredients.filter((_, i) => i !== idx)
      });
    }
  };

  const handleInstructionChange = (idx, value) => {
    const updated = [...formData.instructions];
    updated[idx] = value;
    setFormData({ ...formData, instructions: updated });
  };

  const handleAddInstruction = () => {
    setFormData({
      ...formData,
      instructions: [...formData.instructions, '']
    });
  };

  const handleRemoveInstruction = (idx) => {
    if (formData.instructions.length > 1) {
      setFormData({
        ...formData,
        instructions: formData.instructions.filter((_, i) => i !== idx)
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Recipe Title is required!');
      return;
    }

    const payload = {
      ...formData,
      title: formData.title.trim(),
      prepTime: Number(formData.prepTime) || 15,
      cookTime: Number(formData.cookTime) || 20,
      servings: Number(formData.servings) || 4,
      calories: Number(formData.calories) || 450,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      ingredients: formData.ingredients.filter((ing) => ing.item && ing.item.trim()),
      instructions: formData.instructions.filter((step) => step && step.trim())
    };

    onSave(payload);
    onClose();
  };

  return (
    <div className="modal-backdrop active" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800' }}>
            {initialData ? '✏️ Edit Recipe (Admin)' : '✨ Add New Recipe (Admin)'}
          </h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Title & Image URL */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', marginBottom: '4px' }}>
                Recipe Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Royal Shahi Paneer"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-elevated)', color: 'inherit' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', marginBottom: '4px' }}>
                Image URL (Unsplash or direct image link)
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://..."
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-elevated)', color: 'inherit' }}
              />
            </div>
          </div>

          {/* Category, Cuisine, Difficulty */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', marginBottom: '4px' }}>
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-elevated)', color: 'inherit' }}
              >
                {['Chicken', 'Vegetarian', 'Breakfast', 'Rice', 'Dessert', 'Curry', 'Pasta', 'Seafood', 'Beef'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', marginBottom: '4px' }}>
                Cuisine
              </label>
              <input
                type="text"
                value={formData.cuisine}
                onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
                placeholder="e.g. Indian, Italian, Mexican"
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-elevated)', color: 'inherit' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', marginBottom: '4px' }}>
                Difficulty
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-elevated)', color: 'inherit' }}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          {/* Prep, Cook, Servings, Calories */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', marginBottom: '4px' }}>
                Prep Time (mins)
              </label>
              <input
                type="number"
                min="1"
                value={formData.prepTime}
                onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-elevated)', color: 'inherit' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', marginBottom: '4px' }}>
                Cook Time (mins)
              </label>
              <input
                type="number"
                min="1"
                value={formData.cookTime}
                onChange={(e) => setFormData({ ...formData, cookTime: e.target.value })}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-elevated)', color: 'inherit' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', marginBottom: '4px' }}>
                Servings
              </label>
              <input
                type="number"
                min="1"
                value={formData.servings}
                onChange={(e) => setFormData({ ...formData, servings: e.target.value })}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-elevated)', color: 'inherit' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', marginBottom: '4px' }}>
                Calories (kcal)
              </label>
              <input
                type="number"
                min="1"
                value={formData.calories}
                onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-elevated)', color: 'inherit' }}
              />
            </div>
          </div>

          {/* Description & Tags */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', marginBottom: '4px' }}>
              Short Description
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="A mouthwatering authentic delicacy crafted with rich spices..."
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-elevated)', color: 'inherit' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', marginBottom: '4px' }}>
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="Indian, Curry, High Protein, Dinner"
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-elevated)', color: 'inherit' }}
            />
          </div>

          {/* Ingredients Section */}
          <div style={{ marginBottom: '1.5rem', background: 'var(--bg-elevated)', padding: '1.25rem', borderRadius: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontWeight: '800', fontSize: '0.95rem' }}>Ingredients</span>
              <button type="button" onClick={handleAddIngredient} className="btn btn-ghost btn-sm" style={{ color: '#f97316' }}>
                <Plus size={14} /> Add Ingredient
              </button>
            </div>
            {formData.ingredients.map((ing, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <input
                  type="number"
                  step="any"
                  placeholder="Amount"
                  value={ing.amount}
                  onChange={(e) => handleIngredientChange(idx, 'amount', e.target.value)}
                  style={{ width: '90px', padding: '8px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', color: 'inherit' }}
                />
                <input
                  type="text"
                  placeholder="Unit (tbsp, cups)"
                  value={ing.unit}
                  onChange={(e) => handleIngredientChange(idx, 'unit', e.target.value)}
                  style={{ width: '130px', padding: '8px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', color: 'inherit' }}
                />
                <input
                  type="text"
                  placeholder="Ingredient name (e.g. Saffron strands)"
                  value={ing.item}
                  onChange={(e) => handleIngredientChange(idx, 'item', e.target.value)}
                  style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', color: 'inherit' }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(idx)}
                  style={{ background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '8px', padding: '0 10px', cursor: 'pointer' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Instructions Section */}
          <div style={{ marginBottom: '2rem', background: 'var(--bg-elevated)', padding: '1.25rem', borderRadius: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontWeight: '800', fontSize: '0.95rem' }}>Step-by-Step Instructions</span>
              <button type="button" onClick={handleAddInstruction} className="btn btn-ghost btn-sm" style={{ color: '#f97316' }}>
                <Plus size={14} /> Add Step
              </button>
            </div>
            {formData.instructions.map((step, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                <span style={{ fontWeight: '800', width: '24px', textAlign: 'center', color: '#f97316' }}>{idx + 1}</span>
                <input
                  type="text"
                  placeholder={`Step ${idx + 1} instruction...`}
                  value={step}
                  onChange={(e) => handleInstructionChange(idx, e.target.value)}
                  style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', color: 'inherit' }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveInstruction(idx)}
                  style={{ background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '8px', padding: '8px 10px', cursor: 'pointer' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Submit Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Check size={18} />
              <span>{initialData ? 'Update Recipe' : 'Publish Recipe'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
