import React, { useEffect, useState } from 'react';
import roomService from '../../../../services/roomService'; // Adjust the path as per your project structure
import { useParams } from "react-router-dom";
import TopBar from '../../TopBar/TopBar';
import { styles } from './styles'
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import moment from 'moment';

function RoomPage() {
    const { roomID } = useParams();
    const [room, setRoom] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);
    const [newTimeSlot, setNewTimeSlot] = useState({
        start_time: '00:00',
        end_time: '00:00'
    });

    useEffect(() => {
        const fetchRoomAndTimeSlots = async () => {
            try {
                const roomData = await roomService.getRoomById(roomID);
                setRoom(roomData);

                const timeSlotsData = await roomService.getTimeSlotsByRoomId(roomID);
                setTimeSlots(timeSlotsData);
                console.log(timeSlotsData)

            } catch (error) {
                console.error('Error fetching room and time slots:', error);
            }
        };

        fetchRoomAndTimeSlots();
    }, [roomID]);

    const handleAddTimeSlot = async (e) => {
        e.preventDefault();
        try {
            if (newTimeSlot.start_time && newTimeSlot.end_time) {
                const addedTimeSlot = await roomService.addTimeSlot(roomID, newTimeSlot);
                setTimeSlots([...timeSlots, addedTimeSlot]);
                setNewTimeSlot({ startTime: '', endTime: '' });
            }
        } catch (error) {
            console.error('Error adding time slot:', error);
        }
    };

    const handleDeleteTimeSlot = async (timeSlotId) => {
        try {
            await roomService.deleteTimeSlot(roomID, timeSlotId);
            setTimeSlots(timeSlots.filter(slot => slot.id !== timeSlotId));
        } catch (error) {
            console.error('Error deleting time slot:', error);
        }
    };

    if (!room) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <TopBar />

            <div style={styles.container}>

                <h2>{room.name}</h2>
                <p>Room Details: {room.details}</p>

                <form onSubmit={handleAddTimeSlot} style={styles.formContainer}>
                    <label>Start Time:</label>
                    <TimePicker
                        value={newTimeSlot.start_time}
                        onChange={(time) => setNewTimeSlot({ ...newTimeSlot, start_time: time })}
                        format='HH:mm'
                        disableClock={true}
                    />
                    <label>End Time:</label>
                    <TimePicker
                        value={newTimeSlot.end_time}
                        onChange={(time) => setNewTimeSlot({ ...newTimeSlot, end_time: time })}
                        format='HH:mm'
                        disableClock={true}
                    />
                    <button type="submit" style={styles.deleteButton}>Add Time Slot</button>
                </form>

                <div>
                    <h3>Time Slots:</h3>
                    <ul>
                        {timeSlots && timeSlots.map(slot => (
                            <li key={slot.id} style={styles.timeSlotItem}>
                                {moment.utc(slot.start_time).format('HH:mm')} - {moment.utc(slot.end_time).format('HH:mm')}
                                <button onClick={() => handleDeleteTimeSlot(slot.id)} style={styles.deleteButton}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default RoomPage;
