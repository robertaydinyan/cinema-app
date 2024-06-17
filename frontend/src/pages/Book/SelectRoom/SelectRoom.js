import React from 'react';
import { styles } from './styles';

const SelectRoom = ({ setRoom, nextStep, rooms }) => {
    const handleRoomSelection = (room) => {
        setRoom(room);
        nextStep();
    };

    return (
        <div>
            <h2>Select a Room</h2>
            {rooms.length === 0 ? (
                <p>Loading rooms...</p>
            ) : (
                <div style={styles.roomsList}>
                    {rooms.map(room => (
                        <div 
                            key={room.id} // Add a unique key prop here
                            onClick={() => handleRoomSelection(room)} // Correct the function call here
                            style={styles.roomItem}
                        >
                            <span style={styles.roomInfo}>{room.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectRoom;
