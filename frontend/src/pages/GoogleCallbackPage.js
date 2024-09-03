import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';

const GoogleCallbackPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const token = urlParams.get('token');
        
        if (token) {
            console.log('Token ricevuto:', token); // Log per verifica
            login(token); // Salva il token
            navigate('/home'); // Reindirizza alla home
        } else {
            console.error('Token mancante nel callback Google');
            navigate('/login'); // Torna al login in caso di errore
        }
    }, [location, login, navigate]);

    return (
        <div className="container">
            <h3>Login con Google completato. Reindirizzamento...</h3>
        </div>
    );
};

export default GoogleCallbackPage;
