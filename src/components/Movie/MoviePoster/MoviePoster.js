import React from 'react';
import './MoviePoster.css';

const MoviePoster = ({ URL }) => {
    return (
        <img className="Movie-Poster" src={ URL } />
    );
};

export default MoviePoster;