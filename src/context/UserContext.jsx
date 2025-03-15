import React, { createContext, useState,useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        console.log(token);
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
      } catch (error) {
        console.error('Failed to decode token', error);
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser,loading }}>
      {children}
    </UserContext.Provider>
  );
}