import React from 'react';
import { styles } from './styles';

const SelectMovie = ({ setFilm, nextStep, movies }) => {
    const handleMovieSelection = (movie) => {
        setFilm(movie);
        nextStep();
    };

    return (
        <div>
            <h2>Select a Movie</h2>
            {movies.length === 0 ? (
                <p>Loading movies...</p>
            ) : (
                <div style={styles.moviesList}>
                    {movies.map(movie => (
                        <div 
                            key={movie.id}
                            onClick={() => handleMovieSelection(movie)} 
                            style={styles.movieItem}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <img src={"http://localhost:8000/storage/" + movie.poster} alt={`${movie.title} poster`} style={styles.posterImage} />
                            <span style={styles.movieInfo}>{movie.title}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectMovie;
