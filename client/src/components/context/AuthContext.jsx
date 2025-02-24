
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 

  const login = (role) => {
    setUser({ role });
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(()=>{
    
  },[])


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
