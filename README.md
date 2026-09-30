# 🍳 FlavorCraft — Joyful Gourmet Recipe Studio & Kitchen Assistant

![FlavorCraft Banner](https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80)

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-green.style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.style=for-the-badge)](https://github.com/)

> **FlavorCraft** is a feature-rich, high-performance web application designed to turn daily home cooking into a joyful, organized, and delightful experience. Built with pure HTML5, CSS3 glassmorphic design, and vanilla JavaScript ES6+, FlavorCraft offers zero-delay search, a full-screen step-by-step cooking mode, a 7-day meal planner, interactive Web Audio SFX, HTML5 canvas confetti, and real-time online recipe integration via TheMealDB API.

---

## 🚀 Key Features

### 🔐 1. Zero-Delay Authentication & Quick Demo Sign-Ins
- **Instant Demo Access**: 1-Click login buttons for **Chef Gordon**, **Chef Alex**, or **Guest Pass** so users can explore immediately without typing credentials.
- **Full Auth Flow**: Supports custom Sign Up, Email/Password login with toggleable password visibility, simulated Google Sign-In, and `localStorage` session persistence.

### 🔍 2. Instant Zero-Lag Search & Multi-Filter Discovery
- **0ms Instant Local Filtering**: Searches match across recipe **titles**, **ingredients**, **categories**, **cuisines**, **tags**, and **descriptions** instantly as you type.
- **Asynchronous Online Enrichment**: Background queries to [TheMealDB API](https://www.themealdb.com/api.php) with a 3.5-second timeout guard, smoothly appending online global recipes.
- **"What's Your Cooking Vibe?" Mood Selector**: 1-click filter pills for **⚡ Quick (<25m)**, **🇮🇳 Desi (Indian)**, **🍲 Comfort**, **🥗 Healthy**, **🍰 Sweet**, and **🎉 Party**.
- **Trending Query Chips & Surprise Me**: Quick-search buttons for popular dishes (*Biryani, Paneer, Chicken, Dosa, Pasta*) and a random recipe picker with celebration confetti.

### 🍳 3. Full-Screen Focus Cook Mode
- **Distraction-Free Guidance**: Dedicated full-screen modal showing one cooking step at a time in large, accessible typography.
- **Keyboard Navigation**: Advance steps using `Right Arrow` / `Spacebar` and go back with `Left Arrow`.
- **Integrated Timer & Progress Bar**: Automatically parses minutes from step text to configure cooking timers.
- **Confetti Explosion**: Interactive HTML5 canvas particle celebration upon dish completion!

### 📅 4. 7-Day Weekly Meal Planner
- **Organized Meal Grid**: Plan **Breakfast**, **Lunch**, and **Dinner** slots from Monday through Sunday.
- **1-Click Grocery Export**: Automatically compiles all ingredients from your 7-day meal plan directly into your shopping list.

### 🧊 5. Fridge Pantry Finder ("What's in Your Fridge?")
- Add ingredients you already have at home (e.g., *Chicken, Rice, Paneer, Potatoes, Yogurt*).
- Calculates a **Match Percentage Algorithm** ranking dishes by pantry overlap to reduce food waste.

### 🛒 6. Smart Grocery Shopping List
- Auto-groups items by recipe or dish.
- Features quick ingredient check-off, custom item addition, uncompleted item badges, and 1-click clipboard copying.

### ⚖️ 7. Dynamic Servings Scaler & Recipe Timer
- Real-time ingredient yield multiplier (0.5x, 1x, 2x, 3x, 4x, or custom controls).
- Built-in Web Audio stopwatch/timer with start, pause, and reset controls.

### ⭐ 8. Personal Ratings & Chef Notes
- Interactive **5-Star Rating System** for every dish.
- Auto-saved personal chef scratchpad for recording family tweaks, secret spices, and preparation notes.

### 🎨 9. Glassmorphic UI, Audio SFX & Delight Engine
- **Warm Gourmet Palette**: Saffron gold, strawberry coral, basil emerald, and gourmet plum themes.
- **Light & Dark Mode**: Persistent theme toggle matching system preferences.
- **Web Audio Synthesizer**: Custom retro audio feedback for button taps, favorite toggles, and recipe completions.
- **Pure Canvas Confetti Engine**: Custom lightweight 60fps particle physics engine without heavy external libraries.

---

## 🍛 Curated Recipe Bank

FlavorCraft comes pre-loaded with an extensive bank of curated Indian and international recipes:

| Recipe Title | Category | Cuisine | Prep/Cook Time | Difficulty |
| :--- | :--- | :--- | :--- | :--- |
| **Hyderabadi Chicken Biryani** | Chicken | Indian | 30m / 45m | Hard |
| **Crispy South Indian Masala Dosa** | Breakfast | Indian | 20m / 15m | Medium |
| **Butter Chicken (Murgh Makhani)** | Chicken | Indian | 20m / 30m | Medium |
| **Aloo Paratha / Aloo Roti** | Breakfast | Indian | 20m / 15m | Easy |
| **Aloo Gobi Fry** | Vegetarian | Indian | 15m / 20m | Easy |
| **Palak / Saag Paneer** | Vegetarian | Indian | 20m / 20m | Easy |
| **Gajar Ka Halwa** | Dessert | Indian | 15m / 35m | Medium |
| **Matar Paneer** | Vegetarian | Indian | 15m / 20m | Easy |
| **Veg Dum Biryani** | Rice | Indian | 25m / 35m | Medium |
| **Paneer Butter Masala** | Vegetarian | Indian | 15m / 25m | Easy |
| **Chole Bhature** | Vegetarian | Indian | 25m / 20m | Medium |
| **Classic Italian Spaghetti Carbonara** | Pasta | Italian | 10m / 15m | Easy |
| **Authentic Mexican Street Tacos** | Beef | Mexican | 15m / 15m | Easy |
| **Japanese Teriyaki Salmon Bowl** | Seafood | Japanese | 15m / 15m | Easy |

---

## 📂 Project Architecture
