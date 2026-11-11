# 🍳 FlavorCraft — React + Vite Gourmet Recipe Studio & Kitchen Assistant

![FlavorCraft Banner](https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80)

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-v6-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

> **FlavorCraft** is an interactive, high-performance cooking studio developed with **React** and **Vite**. It features clearly identified **User** and **Admin** modules, **LocalStorage Authentication**, an instant 0ms search engine, a full-screen step-by-step cooking mode, a 7-day meal planner, interactive Web Audio SFX, HTML5 canvas confetti, and full **Vercel deployment** configuration.

---

## 🏛️ Project Modules & Architecture

FlavorCraft cleanly separates concerns into dedicated functional modules:

```
src/
├── modules/
│   ├── auth/                      # 🔐 Authentication Module
│   │   ├── Login.jsx              # 1-Click zero-delay demo logins & credentials
│   │   └── Signup.jsx             # Role-based registration (User / Admin)
│   ├── user/                      # 👨‍🍳 User Module (Home Chef Experience)
│   │   ├── UserDashboard.jsx      # Explore, instant search, mood pills, category filters
│   │   ├── RecipeCard.jsx         # Recipe card with cook mode & plan shortcuts
│   │   ├── RecipeDetailModal.jsx  # Servings multiplier, timer, checklist & notes
│   │   ├── FocusCookMode.jsx      # Step-by-step full-screen cooking guide
│   │   ├── MealPlanner.jsx        # 7-day calendar & 1-click grocery export
│   │   ├── PantryFinder.jsx       # "What's in your fridge?" % match algorithm
│   │   ├── ShoppingList.jsx       # Grouped grocery list with check-off & clipboard copy
│   │   └── Favorites.jsx          # Saved recipes cookbox
│   └── admin/                     # 👑 Admin Module (Control Center & Supervision)
│       ├── AdminLayout.jsx        # Admin header, breadcrumbs, module tabs & user switch
│       ├── AdminDashboard.jsx     # Analytics, catalog stats, category distribution
│       ├── AdminRecipes.jsx       # Recipe Catalog CRUD table with search & filter
│       ├── AdminRecipeModal.jsx   # Create & Edit recipe modal with dynamic lists
│       └── AdminUsers.jsx         # User directory & role promotion/demotion
```

### Module Responsibilities:
1. **User Module**:
   - **Explore & Instant Search**: 0ms local filtering across title, ingredients, cuisine, and category + TheMealDB online search.
   - **Focus Cook Mode**: Full-screen distraction-free step-by-step cooking guide with countdown timer, keyboard navigation, and confetti celebration upon completion.
   - **7-Day Meal Planner**: Breakfast, Lunch, and Dinner schedule with 1-click export to shopping list.
   - **Fridge Pantry Matcher**: Enter ingredients in your fridge; FlavorCraft ranks dishes by match percentage.
   - **Smart Grocery List**: Items grouped by recipe, quick check-offs, and 1-click clipboard copy.
   - **Ratings & Chef Notes**: 5-star ratings and personal cooking tweaks auto-saved to LocalStorage.

2. **Admin Module**:
   - **Dashboard Analytics**: Metrics on total recipes, active users, saved favorites, and category distribution.
   - **Recipe Catalog Management (CRUD)**: Create new recipes, edit instructions/ingredients, and delete recipes.
   - **User Management**: View all registered users and promote users to Admin or demote to User.
   - **Quick Demo Role Switcher**: Instant 1-click toggle between Admin and User views for testing and presentation.

---

## 🔐 Authentication via LocalStorage

All authentication and session state is persisted in browser `localStorage`:
- `flavorcraft_users`: Stored accounts with encrypted passwords and role attributes.
- `flavorcraft_session`: Active user session.

### Pre-Configured Demo Accounts:
| Role | Email | Password | Access |
| :--- | :--- | :--- | :--- |
| **👑 Admin** | `admin@flavorcraft.com` | `admin123` | Full access to Admin Console & User Module |
| **👨‍🍳 User** | `chef@flavorcraft.com` | `password123` | Home chef experience (Explore, Plan, Cook) |
| **🍽️ Guest** | `guest@flavorcraft.app` | `guest` | Instant preview without typing credentials |

---

## ⚡ Quick Start & Local Running

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/FlavorCraft-Recipe-App.git
   cd FlavorCraft-Recipe-App
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🚀 Vercel Deployment Guide

FlavorCraft is pre-configured with `vercel.json` to handle client-side Single Page Application (SPA) routing:

```json
{
  "version": 2,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Steps to Deploy to Vercel:
1. Push your project to GitHub:
   ```bash
   git add .
   git commit -m "feat: ready for Vercel deployment"
   git push -u origin main
   ```
2. Log in to [Vercel.com](https://vercel.com).
3. Click **"Add New..."** → **"Project"** and import your repository.
4. Vercel automatically detects the Vite framework settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"**. Your application will be live in seconds!

---

## 📄 License
Distributed under the **MIT License**.
