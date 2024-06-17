import axios from 'axios';

import API_BASE_URL from './config';

const SESSIONS_BASE_URL = `${API_BASE_URL}sessions/`;

const sessionService = {
    getAllSessions: async () => {
        const response = await axios.get(SESSIONS_BASE_URL);
        return response.data;
    },

    getSessionById: async (sessionId) => {
        const response = await axios.get(`${SESSIONS_BASE_URL}${sessionId}`);
        return response.data;
    },

    createSession: async (data) => {
        const response = await axios.post(SESSIONS_BASE_URL, data);
        return response.data;
    },

    updateSession: async (sessionId, data) => {
        const response = await axios.put(`${SESSIONS_BASE_URL}${sessionId}`, data);
        return response.data;
    },

    deleteSession: async (sessionId) => {
        await axios.delete(`${SESSIONS_BASE_URL}${sessionId}`);
    },
};

export default sessionService;
