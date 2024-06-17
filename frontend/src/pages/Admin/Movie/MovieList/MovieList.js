import React, { useState, useEffect } from 'react';
import movieService from '../../../../services/movieService';
import TopBar from '../../TopBar/TopBar';
import { styles } from './styles';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [newMovieTitle, setNewMovieTitle] = useState('');
    const [newMoviePosterFile, setNewMoviePosterFile] = useState(null); // State for file input
    const [previewUrl, setPreviewUrl] = useState(null); // State for image preview

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const data = await movieService.getAllMovies();
            setMovies(data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const handleCreateMovie = async (e) => {
        e.preventDefault();
        if (newMovieTitle.trim() === '' || !newMoviePosterFile) return;

        // Upload poster file
        const formData = new FormData();
        formData.append('title', newMovieTitle);
        formData.append('poster', newMoviePosterFile);

        try {
            const newMovie = await movieService.createMovie(formData);
            setMovies([...movies, newMovie]);
            setNewMovieTitle('');
            setNewMoviePosterFile(null);
            setPreviewUrl(null); // Clear preview after upload
        } catch (error) {
            console.error('Error creating movie:', error);
        }
    };

    const handleDeleteMovie = async (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this movie?');
        if (!isConfirmed) return;

        try {
            await movieService.deleteMovie(id);
            setMovies(movies.filter(movie => movie.id !== id));
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };

    const handlePosterFileChange = (e) => {
        const file = e.target.files[0];
        setNewMoviePosterFile(file);

        // Preview image
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <TopBar />
            <div style={styles.movieListContainer}>
                <h2 style={styles.header}>Movies</h2>
                <form style={styles.form} onSubmit={handleCreateMovie}>
                    <input
                        type="text"
                        value={newMovieTitle}
                        onChange={(e) => setNewMovieTitle(e.target.value)}
                        style={styles.input}
                        placeholder="Enter movie title"
                        required
                    />
                    <div style={styles.fileInputContainer}>
                        <label htmlFor="poster" style={styles.fileInputLabel}>
                            Choose Poster:
                        </label>
                        <input
                            type="file"
                            id="poster"
                            onChange={handlePosterFileChange}
                            style={styles.fileInput}
                            accept="image/*"
                            required
                        />
                    </div>
                    {previewUrl && (
                        <img src={previewUrl} alt="Preview" style={styles.previewImage} />
                    )}
                    <button type="submit" style={styles.button}>Create</button>
                </form>
                <ul style={styles.movieList}>
                    {movies.map(movie => (
                        <li key={movie.id} style={styles.movieListItem}>
                            <img src={"http://localhost:8000/storage/" + movie.poster} alt={`${movie.title} poster`} style={styles.posterImage} />
                            <span>{movie.title}</span>
                            <button onClick={() => handleDeleteMovie(movie.id)} style={styles.deleteButton}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MovieList;
