import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white text-center py-4">
            <div className="container">
                <p>&copy; {new Date().getFullYear()} Blog Post. Tutti i diritti riservati.</p>
                <p>
                    <a href="/privacy" className="text-white">Politica Privacy</a> |
                    <a href="/terms" className="text-white"> Termini di servizio</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
