import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  Shield,
  UserCheck,
  UserX,
  Trash2,
  Crown
} from 'lucide-react';

export function AdminUsers() {
  const { users, currentUser, updateUserRole, deleteUser } = useAuth();

  const handleToggleRole = (user) => {
    const nextRole = user.role === 'admin' ? 'user' : 'admin';
    if (window.confirm(`Are you sure you want to change ${user.name}'s role to ${nextRole.toUpperCase()}?`)) {
      updateUserRole(user.id, nextRole);
    }
  };

  const handleDelete = (user) => {
    if (user.id === currentUser?.id) {
      alert('You cannot delete your own currently logged in account!');
      return;
    }
    if (window.confirm(`Are you sure you want to delete user "${user.name}" (${user.email})?`)) {
      const res = deleteUser(user.id);
      if (!res.success) {
        alert(res.message);
      }
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '0 0 0.5rem 0' }}>
          Registered User Directory ({users.length})
        </h2>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Manage user permissions, assign administrative privileges, and supervise active accounts stored in LocalStorage.
        </p>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>Avatar</th>
              <th>User Name</th>
              <th>Email Address</th>
              <th>System Role</th>
              <th>Member Since</th>
              <th style={{ textAlign: 'right' }}>Role & Account Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const isCurrent = user.id === currentUser?.id;

              return (
                <tr key={user.id}>
                  <td>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  </td>
                  <td>
                    <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>
                      {user.name} {isCurrent && <span style={{ color: '#f97316', fontSize: '0.8rem' }}>(You)</span>}
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{user.email}</td>
                  <td>
                    <span className={`admin-role-badge ${user.role}`}>
                      {user.role === 'admin' ? (
                        <>
                          <Crown size={12} /> ADMIN
                        </>
                      ) : (
                        <>
                          <UserCheck size={12} /> USER
                        </>
                      )}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {user.createdAt || '2026-01-01'}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button
                        onClick={() => handleToggleRole(user)}
                        className="btn btn-sm btn-secondary"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}
                        title={user.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}
                      >
                        <Shield size={14} />
                        <span>{user.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}</span>
                      </button>

                      {!isCurrent && (
                        <button
                          onClick={() => handleDelete(user)}
                          className="admin-action-btn delete"
                          title="Delete User"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
