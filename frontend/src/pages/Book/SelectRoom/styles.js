// styles.js
export const styles = {
    bookingProcess: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    stepsIndicator: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: '20px',
    },
    step: {
        padding: '10px 20px',
        borderRadius: '5px',
        backgroundColor: '#e0e0e0',
        color: '#333',
    },
    activeStep: {
        backgroundColor: '#4caf50',
        color: '#fff',
    },
    // roomsList: {
    //     display: 'flex'
    // },
    // roomLink: {
    //     textDecoration: 'none',
    //     color: 'grey',
    //     padding: 20,
    //     textDecoration: 'none',
    //     color: 'rgb(76, 175, 80)'
    // }

    roomsList: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        padding: '20px',
        justifyContent: 'center',
    },
    roomItem: {
        backgroundColor: '#ffffff',
        border: '1px solid #dddddd',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        width: '200px',
        textAlign: 'center',
        transition: 'transform 0.2s, boxShadow 0.2s',
        cursor: 'pointer'
    },
    roomInfo: {
        fontSize: '1.2em',
        fontWeight: 'bold',
        color: '#333333',
    },
};
