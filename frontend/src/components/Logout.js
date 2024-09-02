import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload(); // Ricarica la pagina
    };

    return (
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
    );
};

export default Logout;
