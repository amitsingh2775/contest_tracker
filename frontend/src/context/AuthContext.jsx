import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getProfile } from "../services/api"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [profile, setProfile] = useState(null); 

  // Check if token is valid (not expired)
  const isTokenValid = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      return decoded.exp > currentTime; // Check if token is not expired
    } catch (error) {
      console.error('Invalid token:', error);
      return false;
    }
  };

  // Load token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && isTokenValid(storedToken)) {
      const decoded = jwtDecode(storedToken);
      setUser(decoded);
      setToken(storedToken);
      getProfile()
        .then((response) => setProfile(response.data))
        .catch(() => setProfile(null));
    } else {
      localStorage.removeItem('token'); // Remove expired/invalid token
      setUser(null);
      setToken(null);
    }
  }, []);

  const login = (newToken) => {
    if (isTokenValid(newToken)) {
      localStorage.setItem('token', newToken);
      const decoded = jwtDecode(newToken);
      setUser(decoded);
      setToken(newToken);
    } else {
      throw new Error('Invalid or expired token');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token,profile, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};