import React, { useState, useEffect } from 'react';
import roomService from '../../../../services/roomService';
import { styles } from './styles';
import TopBar from '../../TopBar/TopBar';
import { Link } from "react-router-dom";
import Select from 'react-select';
import SessionForm from '../SessionForm/SessionForm'
import movieService from '../../../../services/movieService';
import sessionService from '../../../../services/sessionService';
import moment from 'moment';

function SessionList() {
    const [rooms, setRooms] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchSessions() {
            const data = await sessionService.getAllSessions();
            setSessions(data);
            console.log(data)
        }
        fetchSessions();
    }, []);

    useEffect(() => {
        async function fetchRooms() {
            const data = await roomService.getAllRooms();
            setRooms(data);
        }
        fetchRooms();
    }, []);


    useEffect(() => {
        async function fetchMoovies() {
            const data = await movieService.getAllMovies();
            setMovies(data);
        }
        fetchMoovies();
    }, []);

    const handleDeleteSession = () => {

    }

    const updateSessions = (newSession) => {
        setSessions([...sessions, newSession])
    }

    return (
        <div>
            <TopBar />

            <div style={styles.roomListContainer}>
                <div style={styles.roomListHeader}>
                    <h2>Rooms</h2>
                    <SessionForm rooms={rooms} movies={movies} updateSessions={updateSessions} />
                </div>
                <ul>
                    {sessions.map(session => (
                        <li key={session.id} style={styles.roomListItem}>
                            <span>{session.room.name}</span>
                            <span>{session.movie.title}</span>
                            <span>{session.date}</span>
                            <span>{moment.utc(session.time_slot.start_time).format('HH:mm')} - {moment.utc(session.time_slot.end_time).format('HH:mm')}</span>
                            <Link to={`/admin/session/${session.id}`}>Details</Link>
                            <button onClick={() => handleDeleteSession(session.id)} style={styles.deleteButton}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SessionList;
