import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { styles } from './styles'; // Import styles object

const Home = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Welcome to Cinema App</h1>
            <p style={styles.paragraph}>The most populated cinema application</p>
            <p style={styles.paragraph}>Click here to book your place</p>
            <Link to="/book"> Book</Link>
{/* 
            <div style={styles.roomsContainer}>
                <h2>Available Rooms:</h2>
                
            </div> */}
        </div>
    );
};

export default Home;
