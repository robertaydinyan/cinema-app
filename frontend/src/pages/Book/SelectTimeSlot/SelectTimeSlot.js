import React, { useEffect, useState } from 'react';
import timeSlotService from '../../../services/timeSlotService';
import moment from 'moment';
import { styles } from './styles';

const SelectTimeSlot = ({ setTimeSlot, nextStep, room, film }) => {
    const [timeSlots, setTimeSlots] = useState([]);
    const [hoveredId, setHoveredId] = useState(null);

    useEffect(() => {
        if (room && film) {
            fetchTimeSlots(room, film);
        }
    }, [room, film]);

    const fetchTimeSlots = async (room, film) => {
        try {
            const timeSlotsData = await timeSlotService.getAvaiableTimeSlots(room.id, film.id);
            console.log(timeSlotsData)
            setTimeSlots(timeSlotsData);
        } catch (error) {
            console.error('Error fetching time slots:', error);
            setTimeSlots([]);
        }
    };

    const handleTimeSlotSelection = (timeSlot) => {
        setTimeSlot(timeSlot);
        nextStep();
    };

    const handleMouseEnter = (id) => {
        setHoveredId(id);
    };

    const handleMouseLeave = () => {
        setHoveredId(null);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Select a Time Slot</h2>
            {timeSlots.length === 0 ? (
                <p style={styles.noSlotsMessage}>No available time slot was found</p>
            ) : (
                <div>
                    {Object.keys(timeSlots).map((date) => (
                        <div key={date}>
                            <h3 style={styles.dateHeading}>{moment(date).format('MMMM Do, YYYY')}</h3>
                            <ul style={styles.timeSlotList}>
                                {timeSlots[date].map((item) => (
                                    <li
                                        key={item.id}
                                        style={
                                            hoveredId === item.id
                                                ? { ...styles.timeSlotItem, ...styles.timeSlotItemHover }
                                                : styles.timeSlotItem
                                        }
                                        onMouseEnter={() => handleMouseEnter(item.id)}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={() => handleTimeSlotSelection(item.time_slot.id)}
                                    >
                                        {moment.utc(item.time_slot.start_time).format('HH:mm')} - {moment.utc(item.time_slot.end_time).format('HH:mm')}
                                        {/* {' '} */}
                                        {/* ID: {item.id} */}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectTimeSlot;
