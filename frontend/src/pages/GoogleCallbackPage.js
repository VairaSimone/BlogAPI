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
            // Salva il token (meglio usare httpOnly cookies, ma per semplicità usiamo localStorage qui)
            localStorage.setItem('token', token);

            // Aggiorna lo stato dell'autenticazione
            login(token);

            // Reindirizza l'utente alla home page o alla pagina precedente
            navigate('/home');
        } else {
            // Se manca il token, riporta l'utente alla pagina di login
            navigate('/login');
        }
    }, [location, login, navigate]);

    return (
        <div className="container">
            <h3>Login con Google completato. Reindirizzamento...</h3>
        </div>
    );
};

export default GoogleCallbackPage;
