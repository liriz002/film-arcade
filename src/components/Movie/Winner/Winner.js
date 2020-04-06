import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'; 
import { Animation } from '../../Lottie/Winner/Winner';
import Button from '../../UI/Button/Button';
import './Winner.css';

const Winner = ( props ) => {

    // We play the winning audio
    let audio = new Audio('/sounds/winner.wav');
    audio.play();

    let winner = props.movies[ props.winningMovieIndex ];

    // If there's not a winning movie, we redirect to the homepage
    if ( props.movies.length == 0 || props.winningMovieIndex == -1 ) {
        return (
            <Redirect to="/" />
        )
    }

    return (
        <div>
            <h2>Enjoy the show!</h2>
            <Animation id="Animation-1" />
            <Animation id="Animation-2" />
            <img id="Winner-Poster" src={ winner.posterURL } />
            <Button id="Rent-Buy-Btn" classes="Button1" title="RENT/BUY" />
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