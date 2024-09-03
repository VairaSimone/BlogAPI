import React from 'react';

const GoogleLogin = () => {
    const handleGoogleLogin = () => {
        // Reindirizza alla rotta di login Google sul backend
        window.location.href = 'http://localhost:5000/api/v1/login-google';
    };

    return (
        <button className="btn btn-danger" onClick={handleGoogleLogin}>
            Login con Google
        </button>
    );
};

export default GoogleLogin;
