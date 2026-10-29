import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_RECIPES } from '../data/initialRecipes';
import { soundManager } from '../components/audio/soundEffects';

const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  // Recipes state (Initial + custom/admin recipes)
  const [recipes, setRecipes] = useState(() => {
    try {
      const saved = localStorage.getItem('flavorcraft_recipes');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {}
    return INITIAL_RECIPES;
  });

  // Favorites
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('flavorcraft_favorites');
      return saved ? JSON.parse(saved) : ['indian-1', 'indian-2', 'indian-3'];
    } catch (e) {
      return ['indian-1', 'indian-2'];
    }
  });

  // 7-Day Meal Plan
  const [mealPlan, setMealPlan] = useState(() => {
    try {
      const saved = localStorage.getItem('flavorcraft_meal_plan');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const initial = {};
    days.forEach((d) => {
      initial[d] = { breakfast: null, lunch: null, dinner: null };
    });
    // Add default dishes for immediate visual delight
    initial.monday.dinner = INITIAL_RECIPES[0];
    initial.tuesday.lunch = INITIAL_RECIPES[1];
    initial.wednesday.dinner = INITIAL_RECIPES[2];
    return initial;
  });

  // Grocery Shopping List
  const [shoppingList, setShoppingList] = useState(() => {
    try {
      const saved = localStorage.getItem('flavorcraft_shopping_list');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      { id: 'shop-1', recipeTitle: 'Hyderabadi Chicken Biryani', text: 'Basmati Rice (2 cups)', completed: false },
      { id: 'shop-2', recipeTitle: 'Hyderabadi Chicken Biryani', text: 'Saffron Strands (1/4 tsp)', completed: true },
      { id: 'shop-3', recipeTitle: 'Crispy South Indian Masala Dosa', text: 'Curry leaves & Mustard seeds', completed: false }
    ];
  });

  // Pantry Items
  const [pantryItems, setPantryItems] = useState(() => {
    try {
      const saved = localStorage.getItem('flavorcraft_pantry');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return ['Chicken', 'Basmati Rice', 'Paneer', 'Onion', 'Ginger', 'Garlic', 'Yogurt', 'Ghee'];
  });

  // Ratings & Chef Notes
  const [ratings, setRatings] = useState(() => {
    try {
      const saved = localStorage.getItem('flavorcraft_ratings');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('flavorcraft_notes');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // Search & Filtering State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMood, setActiveMood] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeCuisine, setActiveCuisine] = useState('all');
  const [activeDifficulty, setActiveDifficulty] = useState('all');
  const [activeSort, setActiveSort] = useState('recommended');

  // Active Modals State
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [cookModeRecipe, setCookModeRecipe] = useState(null);
  const [mealPlanModalRecipe, setMealPlanModalRecipe] = useState(null);

  // Sync with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('flavorcraft_recipes', JSON.stringify(recipes));
    } catch (e) {}
  }, [recipes]);

  useEffect(() => {
    try {
      localStorage.setItem('flavorcraft_favorites', JSON.stringify(favorites));
    } catch (e) {}
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('flavorcraft_meal_plan', JSON.stringify(mealPlan));
    } catch (e) {}
  }, [mealPlan]);

  useEffect(() => {
    try {
      localStorage.setItem('flavorcraft_shopping_list', JSON.stringify(shoppingList));
    } catch (e) {}
  }, [shoppingList]);

  useEffect(() => {
    try {
      localStorage.setItem('flavorcraft_pantry', JSON.stringify(pantryItems));
    } catch (e) {}
  }, [pantryItems]);

  useEffect(() => {
    try {
      localStorage.setItem('flavorcraft_ratings', JSON.stringify(ratings));
    } catch (e) {}
  }, [ratings]);

  useEffect(() => {
    try {
      localStorage.setItem('flavorcraft_notes', JSON.stringify(notes));
    } catch (e) {}
  }, [notes]);

  // ================= ADMIN CRUD OPERATIONS =================
  const addRecipe = (recipeData) => {
    const newRecipe = {
      ...recipeData,
      id: `recipe-${Date.now()}`,
      isCustom: true,
      createdAt: new Date().toISOString()
    };
    setRecipes((prev) => [newRecipe, ...prev]);
    soundManager.play('success');
    return newRecipe;
  };

  const updateRecipe = (id, updatedData) => {
    setRecipes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updatedData, updatedAt: new Date().toISOString() } : r))
    );
    if (selectedRecipe && selectedRecipe.id === id) {
      setSelectedRecipe((prev) => ({ ...prev, ...updatedData }));
    }
    soundManager.play('pop');
  };

  const deleteRecipe = (id) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
    setFavorites((prev) => prev.filter((favId) => favId !== id));
    if (selectedRecipe && selectedRecipe.id === id) setSelectedRecipe(null);
    soundManager.play('pop');
  };

  // ================= USER OPERATIONS =================
  const toggleFavorite = (recipeId) => {
    setFavorites((prev) => {
      const exists = prev.includes(recipeId);
      const updated = exists ? prev.filter((id) => id !== recipeId) : [...prev, recipeId];
      soundManager.play(exists ? 'pop' : 'chime');
      return updated;
    });
  };

  const rateRecipe = (recipeId, score) => {
    setRatings((prev) => ({ ...prev, [recipeId]: score }));
    soundManager.play('chime');
  };

  const saveNote = (recipeId, text) => {
    setNotes((prev) => ({ ...prev, [recipeId]: text }));
  };

  const addToMealPlan = (day, slot, recipe) => {
    setMealPlan((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [slot]: recipe
      }
    }));
    soundManager.play('success');
  };

  const removeFromMealPlan = (day, slot) => {
    setMealPlan((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [slot]: null
      }
    }));
    soundManager.play('pop');
  };

  const exportMealPlanToGrocery = () => {
    const newItems = [];
    Object.entries(mealPlan).forEach(([day, slots]) => {
      Object.entries(slots).forEach(([slot, recipe]) => {
        if (recipe && recipe.ingredients) {
          recipe.ingredients.forEach((ing) => {
            const ingText = typeof ing === 'string' ? ing : `${ing.amount || ''} ${ing.unit || ''} ${ing.item || ''}`.trim();
            newItems.push({
              id: `shop-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
              recipeTitle: `${recipe.title} (${day.toUpperCase()})`,
              text: ingText,
              completed: false
            });
          });
        }
      });
    });

    if (newItems.length > 0) {
      setShoppingList((prev) => [...prev, ...newItems]);
      soundManager.play('success');
      return newItems.length;
    }
    return 0;
  };

  const addPantryItem = (item) => {
    const trimmed = (item || '').trim();
    if (!trimmed) return;
    if (!pantryItems.some((p) => p.toLowerCase() === trimmed.toLowerCase())) {
      setPantryItems((prev) => [...prev, trimmed]);
      soundManager.play('pop');
    }
  };

  const removePantryItem = (item) => {
    setPantryItems((prev) => prev.filter((p) => p.toLowerCase() !== item.toLowerCase()));
    soundManager.play('pop');
  };

  const addShoppingItem = (recipeTitle, text) => {
    const newItem = {
      id: `shop-${Date.now()}`,
      recipeTitle: recipeTitle || 'Custom Grocery',
      text: text.trim(),
      completed: false
    };
    setShoppingList((prev) => [newItem, ...prev]);
    soundManager.play('pop');
  };

  const toggleShoppingItem = (id) => {
    setShoppingList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
    soundManager.play('pop');
  };

  const removeShoppingItem = (id) => {
    setShoppingList((prev) => prev.filter((item) => item.id !== id));
    soundManager.play('pop');
  };

  const clearCompletedShopping = () => {
    setShoppingList((prev) => prev.filter((item) => !item.completed));
    soundManager.play('pop');
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        favorites,
        mealPlan,
        shoppingList,
        pantryItems,
        ratings,
        notes,
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
        setActiveSort,
        selectedRecipe,
        setSelectedRecipe,
        cookModeRecipe,
        setCookModeRecipe,
        mealPlanModalRecipe,
        setMealPlanModalRecipe,
        // Admin CRUD
        addRecipe,
        updateRecipe,
        deleteRecipe,
        // User Actions
        toggleFavorite,
        rateRecipe,
        saveNote,
        addToMealPlan,
        removeFromMealPlan,
        exportMealPlanToGrocery,
        addPantryItem,
        removePantryItem,
        addShoppingItem,
        toggleShoppingItem,
        removeShoppingItem,
        clearCompletedShopping
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipes() {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
}
