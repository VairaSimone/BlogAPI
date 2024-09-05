import React, { createContext, useState, useEffect, useCallback } from 'react';
import { IsTokenExpired } from '../services/IsTokenExpired';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && !IsTokenExpired(token)) {
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