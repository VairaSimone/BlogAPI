// components/Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white text-center py-4">
            <div className="container">
                <p>&copy; {new Date().getFullYear()} Blog Platform. All Rights Reserved.</p>
                <p>
                    <a href="/privacy" className="text-white">Privacy Policy</a> | 
                    <a href="/terms" className="text-white"> Terms of Service</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
