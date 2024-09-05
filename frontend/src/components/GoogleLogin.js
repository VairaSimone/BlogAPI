import React from 'react';

const GoogleLogin = () => {
    const handleGoogleLogin = () => {
        window.location.href = `${process.env.REACT_APP_API_URL}/api/v1/login-google`;
    };

    return (
        <button className="btn btn-danger" onClick={handleGoogleLogin}>
            Login con Google
        </button>
    );
};

export default GoogleLogin;
