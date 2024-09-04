import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [nome, setNome] = useState('');
    const [cognome, setCognome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dataNascita, setDataNascita] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!nome || !cognome || !email || !password) {
            setError('I campi sono obbligartori');
            return;
        }

        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('cognome', cognome);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('dataNascita', dataNascita);
        if (avatar) {
            formData.append('avatar', avatar);
        }

        const response = await fetch('/authors', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            navigate('/login');
        } else {
            const data = await response.json();
            setError(data.message || 'Registrazione errata');
        }
    };

    return (
        <div className="form-container">
            <h2>Register</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    value={cognome}
                    onChange={(e) => setCognome(e.target.value)}
                    required
                />
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
                <input
                    type="date"
                    className="form-control"
                    value={dataNascita}
                    onChange={(e) => setDataNascita(e.target.value)}
                />
                <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setAvatar(e.target.files[0])}
                />
                <button type="submit" className="btn btn-primary btn-block">Register</button>
            </form>
            <p className="mt-3">Possiedi già un account? <Link to="/login">Login here</Link></p>
        </div>
    );
};

export default Register;
