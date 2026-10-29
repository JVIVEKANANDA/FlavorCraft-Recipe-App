import React, { useState } from 'react';
import { useRecipes } from '../../context/RecipeContext';
import { AdminRecipeModal } from './AdminRecipeModal';
import { RecipeDetailModal } from '../user/RecipeDetailModal';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  UtensilsCrossed,
  ChefHat
} from 'lucide-react';

export function AdminRecipes() {
  const { recipes, addRecipe, updateRecipe, deleteRecipe } = useRecipes();

  const [search, setSearch] = useState('');
  const [modalState, setModalState] = useState({ open: false, data: null });
  const [previewRecipe, setPreviewRecipe] = useState(null);

  const filtered = recipes.filter((r) =>
    (r.title || '').toLowerCase().includes(search.toLowerCase()) ||
    (r.cuisine || '').toLowerCase().includes(search.toLowerCase()) ||
    (r.category || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAdd = () => {
    setModalState({ open: true, data: null });
  };

  const handleOpenEdit = (recipe) => {
    setModalState({ open: true, data: recipe });
  };

  const handleDelete = (recipe) => {
    if (window.confirm(`Are you sure you want to delete "${recipe.title}" from the catalog?`)) {
      deleteRecipe(recipe.id);
    }
  };

  const handleSaveRecipe = (formData) => {
    if (modalState.data) {
      updateRecipe(modalState.data.id, formData);
      alert('✅ Recipe updated successfully!');
    } else {
      addRecipe(formData);
      alert('🎉 New recipe added successfully!');
    }
  };

  return (
    <div>
      {/* Top Action Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-surface)', padding: '10px 16px', borderRadius: '12px', border: '1px solid var(--border-subtle)', width: '320px' }}>
          <Search size={18} color="var(--text-muted)" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search recipes by name, cuisine..."
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', color: 'inherit', fontSize: '0.9rem' }}
          />
        </div>

        <button
          onClick={handleOpenAdd}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={18} />
          <span>Add New Recipe</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '80px' }}>Image</th>
              <th>Recipe Name</th>
              <th>Category</th>
              <th>Cuisine</th>
              <th>Total Time</th>
              <th>Difficulty</th>
              <th>Ingredients</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                  No matching recipes found in database.
                </td>
              </tr>
            ) : (
              filtered.map((recipe) => (
                <tr key={recipe.id}>
                  <td>
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      style={{ width: '50px', height: '50px', borderRadius: '10px', objectFit: 'cover' }}
                    />
                  </td>
                  <td>
                    <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{recipe.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      ID: {recipe.id} {recipe.isCustom && '• (Custom)'}
                    </div>
                  </td>
                  <td>
                    <span style={{ background: 'var(--bg-elevated)', padding: '4px 10px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: '700' }}>
                      {recipe.category || 'Gourmet'}
                    </span>
                  </td>
                  <td>{recipe.cuisine || 'International'}</td>
                  <td>{(recipe.prepTime || 10) + (recipe.cookTime || 20)} mins</td>
                  <td>
                    <span className={`difficulty-pill ${(recipe.difficulty || 'Easy').toLowerCase()}`}>
                      {recipe.difficulty || 'Easy'}
                    </span>
                  </td>
                  <td>{recipe.ingredients?.length || 0} items</td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button
                        onClick={() => setPreviewRecipe(recipe)}
                        className="admin-action-btn"
                        style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}
                        title="Preview Recipe"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(recipe)}
                        className="admin-action-btn edit"
                        title="Edit Recipe"
                      >
                        <Edit size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(recipe)}
                        className="admin-action-btn delete"
                        title="Delete Recipe"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit / Add Modal */}
      <AdminRecipeModal
        isOpen={modalState.open}
        onClose={() => setModalState({ open: false, data: null })}
        onSave={handleSaveRecipe}
        initialData={modalState.data}
      />

      {/* Preview Modal */}
      {previewRecipe && (
        <RecipeDetailModal
          recipe={previewRecipe}
          onClose={() => setPreviewRecipe(null)}
          onLaunchCookMode={() => {}}
          onOpenAddToPlan={() => {}}
        />
      )}
    </div>
  );
}
