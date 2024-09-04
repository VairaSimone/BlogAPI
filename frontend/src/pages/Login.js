import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import GoogleLogin from '../components/GoogleLogin';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Email and password sono richiesti.');
            return;
        }

        try {
            const response = await fetch('/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const { message } = await response.json();
                setError(message || 'Credenziali invalide.');
                return;
            }

            const data = await response.json();

            if (data.token) {
                login(data.token);
                navigate('/home');
            } else {
                setError('Login errato. Token non ricevuto.');
            }
        } catch (err) {
            console.error('errore Login:', err);
            setError('Errori, riprovare più tardi.');
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="btn btn-primary btn-block">Login</button>
            </form>
            <p className="mt-3">Don't have an account? <Link to="/register">Sign up here</Link></p>
            <GoogleLogin />

        </div>
    );
};

export default Login;
