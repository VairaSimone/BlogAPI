// utils/authFetch.js
import { isTokenExpired } from '../services/isTokenExpired';

export const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem('token');

    if (isTokenExpired(token)) {
        localStorage.removeItem('token');
        window.location.href = '/login';  // Redirect to login
        return;
    }

    const headers = {
        'Authorization': `Bearer ${token}`,
        ...options.headers,
    };

    // Automatically include the author ID if the user is creating a blog post
    const authAuthor = JSON.parse(localStorage.getItem('authAuthor'));

    if (options.method === 'POST' && authAuthor) {
        const isFormData = options.body instanceof FormData;
        if (isFormData) {
            options.body.append('author', authAuthor._id);
        } else {
            options.body = JSON.stringify({
                ...JSON.parse(options.body),
                author: authAuthor._id,
            });
            headers['Content-Type'] = 'application/json';
        }
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';  // Redirect to login
    }

    return response;
};
