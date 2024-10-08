import { isTokenExpired } from './isTokenExpired.js';

export const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem('token');

    if (isTokenExpired(token)) {
        localStorage.removeItem('token');
        window.location.href = '/login';  
        return;
    }

    const headers = {
        'Authorization': `Bearer ${token}`,
        ...options.headers,
    };

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

    const response = await fetch(process.env.REACT_APP_API_URL + url, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';  
    }

    return response;
};
