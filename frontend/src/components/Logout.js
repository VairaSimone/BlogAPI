import React from 'react';

const Logout = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload(); 
    };

    return (
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
    );
};

export default Logout;
