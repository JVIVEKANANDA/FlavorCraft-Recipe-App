import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { AdminRoute } from './components/common/AdminRoute';
import { useRecipes } from './context/RecipeContext';

// User Module
import { UserDashboard } from './modules/user/UserDashboard';
import { MealPlanner } from './modules/user/MealPlanner';
import { PantryFinder } from './modules/user/PantryFinder';
import { ShoppingList } from './modules/user/ShoppingList';
import { Favorites } from './modules/user/Favorites';
import { RecipeDetailModal } from './modules/user/RecipeDetailModal';
import { FocusCookMode } from './modules/user/FocusCookMode';

// Admin Module
import { AdminLayout } from './modules/admin/AdminLayout';
import { AdminDashboard } from './modules/admin/AdminDashboard';
import { AdminRecipes } from './modules/admin/AdminRecipes';
import { AdminUsers } from './modules/admin/AdminUsers';

// Auth Module
import { Login } from './modules/auth/Login';
import { Signup } from './modules/auth/Signup';

import { X } from 'lucide-react';

export function App() {
  const { addToMealPlan } = useRecipes();

  // Global Modals State
  const [detailRecipe, setDetailRecipe] = useState(null);
  const [cookModeRecipe, setCookModeRecipe] = useState(null);
  const [planModalRecipe, setPlanModalRecipe] = useState(null);

  // Add to plan modal selection
  const [selectedDay, setSelectedDay] = useState('monday');
  const [selectedSlot, setSelectedSlot] = useState('dinner');

  const handleConfirmAddToPlan = () => {
    if (planModalRecipe) {
      addToMealPlan(selectedDay, selectedSlot, planModalRecipe);
      setPlanModalRecipe(null);
      alert(`✅ Added ${planModalRecipe.title} to ${selectedDay.toUpperCase()} (${selectedSlot.toUpperCase()})!`);
    }
  };

  return (
    <div className="app-root">
      <Navbar />

      <main className="main-content">
        <Routes>
          {/* User Module Routes */}
          <Route
            path="/"
            element={
              <UserDashboard
                onOpenDetail={(r) => setDetailRecipe(r)}
                onOpenCookMode={(r) => setCookModeRecipe(r)}
                onOpenAddToPlan={(r) => setPlanModalRecipe(r)}
              />
            }
          />

          <Route
            path="/planner"
            element={
              <MealPlanner
                onOpenDetail={(r) => setDetailRecipe(r)}
              />
            }
          />

          <Route
            path="/pantry"
            element={
              <PantryFinder
                onOpenDetail={(r) => setDetailRecipe(r)}
                onOpenCookMode={(r) => setCookModeRecipe(r)}
                onOpenAddToPlan={(r) => setPlanModalRecipe(r)}
              />
            }
          />

          <Route
            path="/shopping"
            element={<ShoppingList />}
          />

          <Route
            path="/favorites"
            element={
              <Favorites
                onOpenDetail={(r) => setDetailRecipe(r)}
                onOpenCookMode={(r) => setCookModeRecipe(r)}
                onOpenAddToPlan={(r) => setPlanModalRecipe(r)}
              />
            }
          />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Admin Module Routes (Protected by AdminRoute) */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="recipes" element={<AdminRecipes />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global Recipe Detail Modal */}
      {detailRecipe && (
        <RecipeDetailModal
          recipe={detailRecipe}
          onClose={() => setDetailRecipe(null)}
          onLaunchCookMode={(r) => setCookModeRecipe(r)}
          onOpenAddToPlan={(r) => setPlanModalRecipe(r)}
        />
      )}

      {/* Global Focus Cook Mode Modal */}
      {cookModeRecipe && (
        <FocusCookMode
          recipe={cookModeRecipe}
          onClose={() => setCookModeRecipe(null)}
        />
      )}

      {/* Add To Meal Plan Selection Modal */}
      {planModalRecipe && (
        <div className="modal-backdrop active" onClick={() => setPlanModalRecipe(null)}>
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '480px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800' }}>
                Add to Weekly Meal Plan
              </h3>
              <button className="modal-close-btn" onClick={() => setPlanModalRecipe(null)}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: 'var(--bg-elevated)', padding: '12px', borderRadius: '12px', marginBottom: '1.5rem' }}>
              <img
                src={planModalRecipe.image}
                alt={planModalRecipe.title}
                style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover' }}
              />
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: '700' }}>{planModalRecipe.title}</h4>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{planModalRecipe.cuisine} • {planModalRecipe.category}</span>
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', marginBottom: '6px' }}>
                Choose Day of the Week:
              </label>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', color: 'inherit' }}
              >
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((d) => (
                  <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', marginBottom: '6px' }}>
                Choose Meal Slot:
              </label>
              <select
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', color: 'inherit' }}
              >
                <option value="breakfast">🌅 Breakfast</option>
                <option value="lunch">☀️ Lunch</option>
                <option value="dinner">🌙 Dinner</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button className="btn btn-secondary" onClick={() => setPlanModalRecipe(null)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleConfirmAddToPlan}>
                Confirm & Add to Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
