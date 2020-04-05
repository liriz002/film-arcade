import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'; 

const Winner = ( props ) => {

    // If there's not a winning movie, we redirect to the homepage
    if ( props.movies.length == 0 || props.winningMovieIndex == -1 ) {
        return (
            <Redirect to="/" />
        )
    }

    console.log(props);

    return (
        <div>
            <h1>{ props.movies[ props.winningMovieIndex ].title }</h1>
        </div>
    )
}

function mapStateToProps( state ) {
    return {
        winningMovieIndex: state.globalProps.winningMovieIndex,
        movies: state.movieData.movies
    };
}

function mapDispatchToProps( dispatch ) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Winner);