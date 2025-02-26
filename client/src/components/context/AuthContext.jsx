import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // New loading state

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('loginTime', Date.now()); // Store login time
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('loginTime');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const loginTime = localStorage.getItem('loginTime');

    if (storedToken && storedUser && loginTime) {
      const timeElapsed = Date.now() - parseInt(loginTime, 10);
      const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      if (timeElapsed < twentyFourHours) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } else {
        logout(); // Session expired
      }
    }
    setIsLoading(false); // Set loading to false after checking
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};