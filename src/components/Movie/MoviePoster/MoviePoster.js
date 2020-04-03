import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import './MoviePoster.css';

const MoviePoster = ({ id, URL }) => {
    const [state, setState] = useState({ shouldRedirect: false, movieIndex: 0 });

    // Redirects to the movie details page, passing the movie's index
    const redirectToMovieDetails = ( e ) => {
        setState({ shouldRedirect: true, movieIndex: e.target.id });
    }

    // We render the poster conditionally
    let poster;
    if ( state.shouldRedirect ) {
        poster = <Redirect to={{
            pathname: "/movie/",
            state: { movieIndex: state.movieIndex } 
        }} />
    } else {
        poster = <img className="Movie-Poster" id={ id } src={ URL } onClick={ redirectToMovieDetails } />
    }

    return (
        <div>
            { poster }
        </div>
    );
};

export default MoviePoster;