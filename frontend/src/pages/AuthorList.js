// pages/AuthorsList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authFetch } from '../services/authFetch';

const AuthorsList = () => {
    const [authors, setAuthors] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAuthors = async () => {
            const response = await authFetch('/authors');
            if (response.ok) {
                const data = await response.json();
                
                // Extract the 'dati' array from the response
                if (Array.isArray(data.dati)) {
                    setAuthors(data.dati);
                } else {
                    setError('Unexpected response format');
                    console.error('Expected an array but got:', data);
                }
            } else {
                setError('Failed to fetch authors.');
            }
        };

        fetchAuthors();
    }, []);

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!Array.isArray(authors) || authors.length === 0) {
        return <div>No authors found.</div>;
    }

    return (
        <div className="container">
            <h2>All Authors</h2>
            <div className="row">
                {authors.map(author => (
                    <div key={author._id} className="col-md-4">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">{author.nome} {author.cognome}</h5>
                                <p className="card-text">{author.email}</p>
                                <Link to={`/authors/${author._id}`} className="btn btn-primary">
                                    View Profile
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AuthorsList;
