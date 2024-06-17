import React, { useState, useEffect } from 'react';
import SelectRoom from '../SelectRoom/SelectRoom';
import SelectMovie from '../SelectMovie/SelectMovie';
import SelectTimeSlot from '../SelectTimeSlot/SelectTimeSlot';
import SelectSeat from '../SelectSeat/SelectSeat';
import UserInfoForm from '../UserInfoForm/UserInfoForm';
import { styles } from './styles';
import roomService from '../../../services/roomService';
import movieService from '../../../services/movieService';
import seatService from '../../../services/seatService';

const BookingProcess = () => {
    const [step, setStep] = useState(1);
    const [room, setRoom] = useState(null);
    const [film, setFilm] = useState(null);
    const [timeSlot, setTimeSlot] = useState(null);
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const [rooms, setRooms] = useState([]);
    const [movies, setMovies] = useState([]);

    async function fetchRooms() {
        try {
            const data = await roomService.getAllRooms();
            setRooms(data);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    }

    const fetchMovies = async () => {
        try {
            const data = await movieService.getAllMovies();
            setMovies(data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    useEffect(() => {
        fetchRooms();
        fetchMovies();
    }, []);

    const goBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    }

    const changeStep = (i) => {
        setStep(i);
    }
    const validateInputs = () => {
        if (!username || !phoneNumber || selectedSeats.length === 0 || !timeSlot) {
            setErrorMessage('All fields are required.');
            return false;
        }

        const phoneRegex = /^[0-9]{9}$/;
        if (!phoneRegex.test(phoneNumber)) {
            setErrorMessage('Phone number must be 9 digits.');
            return false;
        }

        return true;
    };

    const book = async () => {
        if (!validateInputs()) {
            return;
        }

        const bookingData = {
            selectedSeats,
            time_slot_id: timeSlot,
            name: username,
            phone: phoneNumber
        };

        try {
            const data = await seatService.bookSeat(bookingData);
            console.log('Booking successful:', data);
            window.location.href = '/';
        } catch (error) {
            console.error('Booking failed:', error);
            setErrorMessage('Booking failed. Please try again.');
        }
    };

    return (
        <div style={styles.bookingProcess}>
            <div style={styles.stepsIndicator}>
                <div style={styles.step} onClick={goBack}>Go back</div>
                <div style={{ ...styles.step, ...(step === 1 ? styles.activeStep : {}) }} onClick={() => changeStep(1)}>Step 1: Select Room</div>
                <div style={{ ...styles.step, ...(step === 2 ? styles.activeStep : {}) }} onClick={() => changeStep(2)}>Step 2: Select Film</div>
                <div style={{ ...styles.step, ...(step === 3 ? styles.activeStep : {}) }} onClick={() => changeStep(3)}>Step 3: Select Time Slot</div>
                <div style={{ ...styles.step, ...(step === 4 ? styles.activeStep : {}) }} onClick={() => changeStep(4)}>Step 4: Pick The Seat</div>
                <div style={{ ...styles.step, ...(step === 5 ? styles.activeStep : {}) }} onClick={() => changeStep(5)}>Step 5: Enter Personal Data</div>
            </div>
            {step === 1 && <SelectRoom setRoom={setRoom} nextStep={nextStep} rooms={rooms} />}
            {step === 2 && <SelectMovie setFilm={setFilm} nextStep={nextStep} movies={movies} />}
            {step === 3 && <SelectTimeSlot setTimeSlot={setTimeSlot} nextStep={nextStep} room={room} film={film} />}
            {step === 4 && <SelectSeat room={ room } selectedSeats={selectedSeats} timeSlot={timeSlot} 
                                        setSelectedSeats={setSelectedSeats} nextStep={nextStep} />}
            {step === 5 && <UserInfoForm errorMessage={errorMessage} book={book} username={username} 
                                        setUsername={setUsername} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
            
            />}
        </div>
    );
};

export default BookingProcess;
