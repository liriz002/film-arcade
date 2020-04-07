import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../../store/actions/actions';

import './MoviePoster.css';

const MoviePoster = ( props ) => {
    // Redirects to the movie details page, passing the movie's index
    const redirectToMovieDetails = ( e ) => {
        props.onUpdateShowMovieModal( true );
        props.onUpdateCurrentMovieIndex( e.target.id );
    }

    return (
        <div>
            <img alt={ props.id } className="Movie-Poster" id={ props.id } src={ props.URL } onClick={ redirectToMovieDetails } />
        </div>
    );
};

function mapStateToProps( state ) {
    return {

    };
}

function mapDispatchToProps( dispatch ) {
    return {
        onUpdateShowMovieModal: ( show ) => dispatch( Actions.updateShowMovieModal( show )),
        onUpdateCurrentMovieIndex: ( movieIndex ) => dispatch( Actions.updateCurrentMovieIndex( movieIndex ))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviePoster);

/*
    // We render the poster conditionally
    let poster;
    if ( state.shouldRedirect ) {
        poster = <Redirect to={{
            pathname: "/movie/",
            state: { movieIndex: state.movieIndex } 
        }} />
    } else {

    }
*/