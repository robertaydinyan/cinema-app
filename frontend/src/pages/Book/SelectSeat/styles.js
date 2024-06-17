export const styles = {
    container: {
        padding: '20px',
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
    },
    noSeatsMessage: {
        fontSize: '18px',
        color: 'red',
    },
    seatRow: {
        display: 'flex',
        flexDirection: 'column',
        // gridTemplateColumns: 'repeat(auto-fill, minmax(50px, 1fr))',
        gap: '10px',
    },
    seatItem: {
        width: '50px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid transparent',
        cursor: 'pointer',
        color: 'white',
        borderRadius: '50%', // Round shape to resemble a chair
        width: '40px',
        height: '40px',
        margin: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginTop: '20px',
    },
};
