// styles.js
export const styles = {
    moviesList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px',
        padding: '20px',
    },
    movieItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'transform 0.2s',
    },
    movieItemHover: {
        transform: 'scale(1.05)',
    },
    posterImage: {
        width: '150px',
        height: '225px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    movieInfo: {
        marginTop: '10px',
        fontSize: '16px',
        fontWeight: 'bold',
        textAlign: 'center',
    },
};