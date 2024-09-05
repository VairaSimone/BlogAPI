import React, { createContext, useState, useEffect, useCallback } from 'react';
import { isTokenExpired } from '../services/IsTokenExpired';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && !isTokenExpired(token)) {
            setIsAuthenticated(true);
        } else {
            logout(); 
        }
    }, []);

    const login = useCallback((token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
