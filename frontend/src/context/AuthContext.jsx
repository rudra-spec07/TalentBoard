import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { loginRequest, registerRequest, getMeRequest } from '../features/auth/services/auth.api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Re-hydrate user profile if token is present on load
  useEffect(() => {
    const bootstrapAuth = async () => {
      if (token) {
        try {
          // Set default auth header for initial request
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await getMeRequest();
          
          if (response.data && response.data.success) {
            setUser(response.data.data.user);
            setIsAuthenticated(true);
          } else {
            handlePurge();
          }
        } catch (err) {
          console.error('Failed to restore authentication session:', err.message);
          handlePurge();
        }
      }
      setIsLoading(false);
    };

    bootstrapAuth();
  }, [token]);

  const handlePurge = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  // Log in user
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await loginRequest({ email, password });
      
      if (response.data && response.data.success) {
        const { token: receivedToken, user: receivedUser } = response.data.data;
        
        localStorage.setItem('token', receivedToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${receivedToken}`;
        
        setToken(receivedToken);
        setUser(receivedUser);
        setIsAuthenticated(true);
        setIsLoading(false);
        return receivedUser;
      }
    } catch (err) {
      setIsLoading(false);
      const errMsg = err.response?.data?.error?.message || 'Login failed. Please check your credentials.';
      setError(errMsg);
      throw new Error(errMsg);
    }
  };

  // Register a new user
  const register = async (firstName, lastName, email, password, role) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await registerRequest({ firstName, lastName, email, password, role });
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setIsLoading(false);
      const errMsg = err.response?.data?.error?.message || 'Registration failed.';
      setError(errMsg);
      throw new Error(errMsg);
    }
  };

  // Log out user
  const logout = () => {
    handlePurge();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        error,
        login,
        register,
        logout,
        setError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
