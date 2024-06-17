import axios from 'axios';
import API_BASE_URL from './config';

const TOKEN_KEY = 'accessToken';
let userData = null;

export const setAccessToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const getAccessToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const clearAccessToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = async () => {
    try {
        const userData = await getUserData();
        return !!userData;
    } catch (error) {
        console.error('Error checking authentication status:', error);
        return false;
    }
};

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}login`, {
            email,
            password
        });

        const { token } = response.data;
        console.log(response.data)
        setAccessToken(token);

        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const logout = async () => {
    try {
        const token = getAccessToken();
        if (!token) {
            throw new Error('No access token found');
        }

        await axios.post(`${API_BASE_URL}logout`, null, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        clearAccessToken();
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};

export const getUserData = async () => {
    if (!userData) {
        try {
            const token = getAccessToken();
            if (!token) {
                return null;
                // throw new Error('No access token found');
            }

            const response = await axios.get('http://localhost:8000/api/user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            userData = response.data;
            return userData;
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            throw error;
        }
    }
    return userData;
};
