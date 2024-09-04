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
            localStorage.setItem('token', token);

            login(token);

            navigate('/home');
        } else {
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
