import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAccessToken, login } from '../../../services/auth';
import { isAuthenticated } from '../../../services/auth';
import { Navigate } from 'react-router-dom';
import { styles } from './styles';

const Login = ({ setAuth }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const isAuthenticatedResult = await isAuthenticated();
                if (isAuthenticatedResult) {
                    navigate('/admin/dashboard'); // Redirect if authenticated
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
            }
        };

        checkAuth();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate email (already implemented)

        try {
            const data = await login(email, password);
            if (data.access_token) {
                setAccessToken(data.access_token);
                setAuth(true); // Set authentication state
                navigate('/admin/dashboard'); // Redirect to dashboard
            } else {
                setErrorMessage('Invalid credentials');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Login</h1>
            <form style={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Login</button>
                <span style={styles.errorMessage}>{errorMessage}</span>
            </form>
        </div>
    );
};

export default Login;
