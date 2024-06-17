import axios from 'axios';
import API_BASE_URL from './config';

const TIME_SLOTS_URL = `${API_BASE_URL}time-slots/`;

async function getAvaiableTimeSlots(roomID, filmID) {
    const response = await axios.get(`${TIME_SLOTS_URL}?roomID=${roomID}&filmID=${filmID}`);
    return response.data;
}

const timeSlotService = {
    getAvaiableTimeSlots
};

export default timeSlotService;
