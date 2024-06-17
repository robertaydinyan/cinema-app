import React from 'react';

function Movie({ movie }) {
    return (
        <div>
            <h3>{movie.name}</h3>
            <p>Movie ID: {movie.id}</p>
        </div>
    );
}

export default Room;
