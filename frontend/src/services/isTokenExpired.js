import { jwtDecode } from 'jwt-decode';

export const IsTokenExpired = (token) => {
    if (!token) return true;

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return decodedToken.exp < currentTime;
};
