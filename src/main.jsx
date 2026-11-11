import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RecipeProvider } from './context/RecipeContext';
import { App } from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<<<<<<< HEAD
    <BrowserRouter basename="/FlavorCraft-Recipe-App">
=======
    <BrowserRouter>
>>>>>>> 467d0be7e5a9d1e75671d57f5bd434a339e2bf77
      <AuthProvider>
        <RecipeProvider>
          <App />
        </RecipeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
