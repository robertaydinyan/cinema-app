import React, { useState } from 'react';
import Select from 'react-select';
import roomService from '../../../../services/roomService';
import sessionService from '../../../../services/sessionService';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import { styles, StyledDatePicker } from './styles';
import DatePicker from 'react-datepicker';

function SessionForm({ rooms, movies, updateSessions }) {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);
    const [buttonHover, setButtonHover] = useState(false);

    const handleRoomChange = async (selectedOption) => {
        setSelectedRoom(selectedOption);
        const data = await roomService.getTimeSlotsByRoomId(selectedOption.value);
        setTimeSlots(data);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeSlotChange = (selectedOption) => {
        setSelectedTimeSlot(selectedOption);
    };

    const handleMovieChange = (selectedOption) => {
        setSelectedMovie(selectedOption);
    };

    const handleCreateSession = async(e) => {
        e.preventDefault();
        const sessionData = {
            room_id: selectedRoom.value,
            date: moment.utc(selectedDate).format('YYYY-MM-DD'),
            time_slot_id: selectedTimeSlot.value,
            movie_id: selectedMovie.value
        };
        let newSession = await sessionService.createSession(sessionData);
        console.log(newSession)
        updateSessions(newSession);
    };

    const roomOptions = rooms.map(room => ({ value: room.id, label: room.name }));
    const timeSlotsOptions = timeSlots.map(slot => ({ value: slot.id, label: moment.utc(slot.start_time).format('HH:mm') + " - " + moment.utc(slot.end_time).format('HH:mm')}));
    const moviesOptions = movies.map(movie => ({ value: movie.id, label: movie.title }));

    return (
        <form onSubmit={handleCreateSession} style={styles.form}>
            <div style={styles.selectContainer}>
                <label>Date </label>   
                <DatePicker 
                    selected={selectedDate} 
                    onChange={handleDateChange} 
                    style={{ width: '100%' }} 
                />
            </div>
            <div style={styles.selectContainer}>
                <label>Room </label>   
                <Select 
                    options={roomOptions} 
                    onChange={handleRoomChange} 
                    value={selectedRoom}
                />
            </div>
            <div style={styles.selectContainer}>
                <label>Time Slot </label>
                <Select 
                    options={timeSlotsOptions} 
                    onChange={handleTimeSlotChange} 
                    value={selectedTimeSlot}
                />
            </div>
            <div style={styles.selectContainer}>
            <label>Movie </label>
                <Select 
                    options={moviesOptions} 
                    onChange={handleMovieChange} 
                    value={selectedMovie}
                />
            </div>
            <button 
                type="submit" 
                style={buttonHover ? { ...styles.button, ...styles.buttonHover } : styles.button}
                onMouseEnter={() => setButtonHover(true)}
                onMouseLeave={() => setButtonHover(false)}
            >
                Create
            </button>
        </form>
    );
}

export default SessionForm;
