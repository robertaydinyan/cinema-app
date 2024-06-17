import axios from 'axios';
import API_BASE_URL from './config';

const BOOKS_BASE_URL = `${API_BASE_URL}books/`;

const seatService = {
    getBusySeats: async (timeSlotId) => {
        const response = await axios.get(`${BOOKS_BASE_URL}by-time-slot/${timeSlotId}`);
        return response.data;
    },
    bookSeat: async (data) => {
        const response = await axios.post(`${BOOKS_BASE_URL}book`, data);
        return response.data;
    },
};

export default seatService;
