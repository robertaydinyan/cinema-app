import React, { useState, useEffect } from 'react';
import { styles } from './styles';
import seatService from '../../../services/seatService'

const SeatSelector = ({ room, selectedSeats, setSelectedSeats, nextStep, timeSlot }) => {
    const [busySeats, setBusySeats] = useState();

    useEffect(() => {
        const fetchBusySeats = async () => {
            if (timeSlot) {
                try {
                    const busySeatsData = await seatService.getBusySeats(timeSlot);
                    setBusySeats(busySeatsData);
                } catch (error) {
                    console.error('Error setting busy seats:', error);
                    setBusySeats([]); // Handle error state if needed
                }
            }
        };

        fetchBusySeats();
    }, []);
    if (!room) return '';
    console.log(busySeats)
    const numRows = room.rows;
    const numCols = room.columns;

    const updateSelectedSeats = (seat) => {
        const newSelectedSeats = [...selectedSeats]; // Create a copy
        const seatIndex = newSelectedSeats.findIndex(s => { return s.seatNumber == seat.seatNumber });
        if (seatIndex !== -1) {
            newSelectedSeats.splice(seatIndex, 1);
        } else {
            newSelectedSeats.push(seat);
        }

        console.log(newSelectedSeats)
        setSelectedSeats(newSelectedSeats);
    };

    const handleSeatClick = (seat) => {
        const updateSelection = () => {
            updateSelectedSeats(seat);
        };
        updateSelection();
    }
    
    const seatElements = [];

    for (let row = 1; row <= numRows; row++) {
        const rowElements = []; // Create an array to hold elements for this row

        for (let col = 1; col <= numCols; col++) {
            const seatNumber = row * numCols + col + 1; 
            const seat = { row, col, seatNumber };
            const isSelected = !selectedSeats.some(s => s.seatNumber === seat.seatNumber);
            const isBusy = busySeats ? busySeats.includes(seatNumber) : false;
            const chairStyle = {
                ...styles.seatItem,
                backgroundColor: isBusy ? "#FF0000" : (isSelected ? '#008000' : '#FFA500'),
                cursor: isBusy ? 'not-allowed' : 'pointer', // Adjust cursor based on busy state
            };
            rowElements.push(
                <div
                    key={`${row}-${col}`}
                    style={chairStyle}
                    onClick={() => handleSeatClick(seat)}
                >
                    {seatNumber}
                </div>
            );
        }

        // Push the row container with all seat elements into seatElements array
        seatElements.push(
            <div key={`row-${row}`} style={{ display: 'flex', justifyContent: 'center' }}>
                {rowElements}
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Select a Seat</h2>
            <div style={styles.seatRow}>
                {seatElements}
            </div>

            <button onClick={nextStep} disabled={selectedSeats.length === 0}>Book Selected Seats</button>
        </div>
    );
};

export default SeatSelector;
