// styles.js

export const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    logo: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
    navLinks: {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        alignItems: 'center', // Align items vertically in the center
    },
    link: {
        textDecoration: 'none',
        color: 'white',
        padding: '10px',
        marginRight: '10px',
        borderRadius: '4px',
        transition: 'background-color 0.3s ease',
    },
    linkHover: {
        backgroundColor: '#0056b3',
    },
    logoutButton: {
        backgroundColor: 'transparent',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        padding: '10px',
        fontSize: 'inherit',
        borderRadius: '4px',
        transition: 'background-color 0.3s ease',
    },
    logoutButtonHover: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
};
