import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';

const PrivateRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const isAuthenticatedResult = await isAuthenticated();
                setAuthenticated(isAuthenticatedResult);
            } catch (error) {
                console.error('Error checking authentication:', error);
                setAuthenticated(false); // Handle error appropriately
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return null; // or a loading spinner or message
    }

    return authenticated ? children : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
