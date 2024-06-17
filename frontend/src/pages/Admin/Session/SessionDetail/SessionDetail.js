import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import sessionService from '../../../../services/sessionService';
import TopBar from '../../TopBar/TopBar';
import { styles } from './styles';

function SessionDetail() {
    const { sessionID } = useParams();
    const [session, setSession] = useState(null);

    useEffect(() => {
        async function fetchSession() {
            try {
                const data = await sessionService.getSessionById(sessionID);
                console.log(data)
                setSession(data);
            } catch (error) {
                console.error('Error fetching session:', error);
            }
        }
        fetchSession();
    }, [sessionID]);

    const handleDeleteSession = async () => {
        try {
            await sessionService.deleteSession(sessionID);
            // Handle successful deletion (e.g., redirect or update session list)
        } catch (error) {
            console.error('Error deleting session:', error);
        }
    };

    if (!session) {
        return <div>Loading session details...</div>;
    }

    return (
        <div>
            <TopBar />
            <div style={styles.sessionDetailContainer}>
                <h2>Session Details</h2>
                <div style={styles.sessionDetail}>
                    <div><strong>Room:</strong> {session.room.name}</div>
                    <div><strong>Movie:</strong> {session.movie.title}</div>
                    <div><strong>Date:</strong> {session.date}</div>
                    <div><strong>Time:</strong> {moment.utc(session.time_slot.start_time).format('HH:mm')} - {moment.utc(session.time_slot.end_time).format('HH:mm')}</div>
                </div>
                <div style={styles.actions}>
                    <button onClick={handleDeleteSession} style={styles.deleteButton}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default SessionDetail;
