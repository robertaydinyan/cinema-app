import React, { useState, useEffect } from 'react';
import roomService from '../../../../services/roomService';
import { styles } from './styles';
import TopBar from '../../TopBar/TopBar';
import { Link } from "react-router-dom";

function RoomList() {
    const [rooms, setRooms] = useState([]);
    const [newRoomName, setNewRoomName] = useState('');

    useEffect(() => {
        async function fetchRooms() {
            const data = await roomService.getAllRooms();
            setRooms(data);
        }
        fetchRooms();
    }, []);

    const handleCreateRoom = async (e) => {
        e.preventDefault();
        if (newRoomName.trim() === '') return;

        const newRoom = await roomService.createRoom({ name: newRoomName });
        setRooms([...rooms, newRoom]);
        setNewRoomName('');
    };

    const handleDeleteRoom = async (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this room?');
        if (!isConfirmed) return;

        await roomService.deleteRoom(id);
        setRooms(rooms.filter(room => room.id !== id));
    };

    return (
        <div>
            <TopBar />

            <div style={styles.roomListContainer}>
                <div style={styles.roomListHeader}>
                    <h2>Rooms</h2>
                    <form style={styles.roomListForm} onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            value={newRoomName}
                            onChange={(e) => setNewRoomName(e.target.value)}
                            style={styles.roomListInput}
                            placeholder="Enter room name"
                            required
                        />
                        <button type="submit" style={styles.roomListButton}>Create</button>
                    </form>
                </div>
                <ul>
                    {rooms.map(room => (
                        <li key={room.id} style={styles.roomListItem}>
                            <Link to={`/admin/rooms/${room.id}`}>{room.name}</Link>
                            <button onClick={() => handleDeleteRoom(room.id)} style={styles.deleteButton}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default RoomList;
