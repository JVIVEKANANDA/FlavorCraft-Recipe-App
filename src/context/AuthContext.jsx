import React, { createContext, useContext, useState, useEffect } from 'react';
import { soundManager } from '../components/audio/soundEffects';
import { triggerConfetti } from '../components/common/Confetti';

const AuthContext = createContext();

const DEFAULT_USERS = [
  {
    id: 'user-admin',
    name: 'Master Admin',
    email: 'admin@flavorcraft.com',
    password: 'admin123',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=150&q=80',
    createdAt: '2026-01-01'
  },
  {
    id: 'user-chef',
    name: 'Chef Gordon',
    email: 'chef@flavorcraft.com',
    password: 'password123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    createdAt: '2026-01-15'
  },
  {
    id: 'user-guest',
    name: 'Guest Chef',
    email: 'guest@flavorcraft.app',
    password: 'guest',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    createdAt: '2026-02-01'
  }
];

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => {
    try {
      const stored = localStorage.getItem('flavorcraft_users');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {}
    localStorage.setItem('flavorcraft_users', JSON.stringify(DEFAULT_USERS));
    return DEFAULT_USERS;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const session = localStorage.getItem('flavorcraft_session');
      if (session) {
        return JSON.parse(session);
      }
    } catch (e) {}
    // Default to Chef Gordon for frictionless testing
    return DEFAULT_USERS[1];
  });

  useEffect(() => {
    try {
      localStorage.setItem('flavorcraft_users', JSON.stringify(users));
    } catch (e) {}
  }, [users]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('flavorcraft_session', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('flavorcraft_session');
      }
    } catch (e) {}
  }, [currentUser]);

  // Login with credentials
  const login = (email, password) => {
    const trimmedEmail = (email || '').trim().toLowerCase();
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === trimmedEmail && u.password === password
    );

    if (!foundUser) {
      return { success: false, message: 'Invalid email or password. Please try again!' };
    }

    setCurrentUser(foundUser);
    soundManager.play('success');
    triggerConfetti(60);
    return { success: true, user: foundUser };
  };

  // 1-Click Demo Login
  const demoLogin = (role = 'user') => {
    const target = role === 'admin' ? users.find((u) => u.role === 'admin') : users.find((u) => u.role === 'user');
    if (target) {
      setCurrentUser(target);
      soundManager.play('success');
      triggerConfetti(50);
      return { success: true, user: target };
    }
  };

  // Sign up a new user
  const signup = ({ name, email, password, role = 'user' }) => {
    const trimmedEmail = (email || '').trim().toLowerCase();
    const existing = users.find((u) => u.email.toLowerCase() === trimmedEmail);
    if (existing) {
      return { success: false, message: 'An account with this email already exists!' };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: trimmedEmail,
      password: password,
      role: role === 'admin' ? 'admin' : 'user',
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name.trim())}`,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUser(newUser);
    soundManager.play('success');
    triggerConfetti(80);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
    soundManager.play('pop');
  };

  // Switch Role helper (instant testing between User & Admin)
  const switchRole = (newRole) => {
    if (!currentUser) return;
    const updated = { ...currentUser, role: newRole };
    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updated : u)));
    soundManager.play('pop');
  };

  // Admin: Update another user's role
  const updateUserRole = (userId, newRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    if (currentUser && currentUser.id === userId) {
      setCurrentUser((prev) => ({ ...prev, role: newRole }));
    }
    soundManager.play('pop');
  };

  // Admin: Delete a user
  const deleteUser = (userId) => {
    if (currentUser && currentUser.id === userId) {
      return { success: false, message: 'You cannot delete the active logged-in user!' };
    }
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    soundManager.play('pop');
    return { success: true };
  };

  const isAdmin = currentUser?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        isAdmin,
        login,
        demoLogin,
        signup,
        logout,
        switchRole,
        updateUserRole,
        deleteUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
