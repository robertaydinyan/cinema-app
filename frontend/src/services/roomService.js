import axios from 'axios';
import API_BASE_URL from './config';

const ROOMS_BASE_URL = `${API_BASE_URL}rooms/`;

const roomService = {
    getAllRooms: async () => {
        const response = await axios.get(ROOMS_BASE_URL);
        return response.data;
    },

    getRoomById: async (roomId) => {
        const response = await axios.get(`${ROOMS_BASE_URL}${roomId}`);
        return response.data;
    },

    createRoom: async (data) => {
        const response = await axios.post(ROOMS_BASE_URL, data);
        return response.data;
    },

    updateRoom: async (roomId, data) => {
        const response = await axios.put(`${ROOMS_BASE_URL}${roomId}`, data);
        return response.data;
    },

    deleteRoom: async (roomId) => {
        await axios.delete(`${ROOMS_BASE_URL}${roomId}`);
    },
    getTimeSlotsByRoomId: async (roomId) => {
        const response = await axios.get(`${ROOMS_BASE_URL}${roomId}/time-slots`);
        return response.data;
    },
    addTimeSlot: async (roomId, timeSlotData) => {
        const response = await axios.post(`${ROOMS_BASE_URL}${roomId}/time-slots`, timeSlotData);
        return response.data;
    },

    updateTimeSlot: async (roomId, timeSlotId, updatedTimeSlotData) => {
        const response = await axios.put(`${ROOMS_BASE_URL}${roomId}/time-slots/${timeSlotId}`, updatedTimeSlotData);
        return response.data;
    },
    deleteTimeSlot: async (roomId, timeSlotId) => {
        await axios.delete(`${ROOMS_BASE_URL}${roomId}/time-slots/${timeSlotId}`);
    },
};

export default roomService;
