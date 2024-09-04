import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/home">Blog</Link>
            <button 
                className="navbar-toggler" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarNav" 
                aria-controls="navbarNav" 
                aria-expanded="false" 
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/home">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/create-post">Crea Post</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/authors">Autori</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile">Profilo</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

export default Navbar;
