import axios from 'axios';
import API_BASE_URL from './config';

const MOVIES_BASE_URL = `${API_BASE_URL}movies/`;

async function getAllMovies() {
    const response = await axios.get(MOVIES_BASE_URL);
    return response.data;
}

async function getMovieById(id) {
    const response = await axios.get(`${MOVIES_BASE_URL}${id}`);
    return response.data;
}

async function createMovie(data) {
    const response = await axios.post(MOVIES_BASE_URL, data);
    return response.data;
}

async function updateMovie(id, data) {
    const response = await axios.put(`${MOVIES_BASE_URL}${id}`, data);
    return response.data;
}

async function deleteMovie(id) {
    await axios.delete(`${MOVIES_BASE_URL}${id}`);
}

const movieService = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
};

export default movieService;
