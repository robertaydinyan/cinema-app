import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../../services/auth';
import { styles } from './styles'; // Import your styles

const TopBar = () => {
    const onLogout = async () => {
        try {
            await logout();
            window.location.href = '/admin/login';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.logo}>Dashboard</div>
            <ul style={styles.navLinks}>
                <li>
                    <Link to="/admin/session" style={styles.link}>Sessions</Link>
                </li>
                <li>
                    <Link to="/admin/rooms" style={styles.link}>Rooms</Link>
                </li>
                <li>
                    <Link to="/admin/movies" style={styles.link}>Movies</Link>
                </li>
                <li>
                    <button
                        onClick={onLogout}
                        style={styles.logoutButton}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default TopBar;
