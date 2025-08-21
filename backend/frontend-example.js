// Example of how to call the API from your React frontend
// You can use either fetch or axios

// ===== USING FETCH =====

// Test connection
const testConnection = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/test');
    const data = await response.json();
    console.log('Connection test:', data.message);
  } catch (error) {
    console.error('Error testing connection:', error);
  }
};

// Create a new user
const createUser = async (userData) => {
  try {
    const response = await fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    console.log('User created:', data);
    return data;
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

// Get all users
const getAllUsers = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/users');
    const data = await response.json();
    console.log('All users:', data.users);
    return data.users;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

// Get one user by ID
const getUserById = async (userId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/users/${userId}`);
    const data = await response.json();
    console.log('User:', data.user);
    return data.user;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

// Update a user
const updateUser = async (userId, userData) => {
  try {
    const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    console.log('User updated:', data);
    return data;
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

// Delete a user
const deleteUser = async (userId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log('User deleted:', data);
    return data;
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

// ===== USING AXIOS =====
// First install axios: npm install axios

/*
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Test connection
const testConnection = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/test`);
    console.log('Connection test:', response.data.message);
  } catch (error) {
    console.error('Error testing connection:', error);
  }
};

// Create a new user
const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, userData);
    console.log('User created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

// Get all users
const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    console.log('All users:', response.data.users);
    return response.data.users;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

// Get one user by ID
const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
    console.log('User:', response.data.user);
    return response.data.user;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

// Update a user
const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/users/${userId}`, userData);
    console.log('User updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

// Delete a user
const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/users/${userId}`);
    console.log('User deleted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};
*/

// ===== USAGE EXAMPLES =====

// Example usage in React component:
/*
import React, { useState, useEffect } from 'react';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', age: '' });

  useEffect(() => {
    // Test connection on component mount
    testConnection();
    // Load users
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const usersData = await getAllUsers();
    setUsers(usersData);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    await createUser(newUser);
    setNewUser({ name: '', email: '', age: '' });
    loadUsers(); // Reload the list
  };

  const handleDeleteUser = async (userId) => {
    await deleteUser(userId);
    loadUsers(); // Reload the list
  };

  return (
    <div>
      <h1>User Management</h1>
      
      {/* Create User Form */}
      <form onSubmit={handleCreateUser}>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({...newUser, name: e.target.value})}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({...newUser, email: e.target.value})}
        />
        <input
          type="number"
          placeholder="Age"
          value={newUser.age}
          onChange={(e) => setNewUser({...newUser, age: e.target.value})}
        />
        <button type="submit">Create User</button>
      </form>

      {/* Users List */}
      <div>
        {users.map(user => (
          <div key={user._id}>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Age: {user.age}</p>
            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserManagement;
*/
