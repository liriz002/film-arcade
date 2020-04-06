import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'; 
import { Animation } from '../../Lottie/Winner/Winner';
import Button from '../../UI/Button/Button';
import * as Actions from '../../../store/actions/actions';
import './Winner.css';

const Winner = ( props ) => {
    const [ playSecondAnimation, setPlaySecondAnimation ] = useState( false );

    // We play the winning audio
    let audio = new Audio('/sounds/winner.wav');
    let winner = props.movies[ props.winningMovieIndex ];

    useEffect(() => {
        setTimeout(() => {
            audio.play();
            setPlaySecondAnimation( true );
        }, 1000);
    }, []);

    // If there's not a winning movie, we redirect to the homepage
    if ( props.movies.length == 0 || props.winningMovieIndex == -1 ) {
        return (
            <Redirect to="/" />
        )
    }

    // Update the current movie index to the winner's index
    props.onUpdateCurrentMovieIndex( winner.id );

    const showStreamingInfoModal = () => {
        props.onUpdateShowStreamingInfoModal( true );
    }

    return (
        <div>
            <h2>Enjoy the show!</h2>
            <Animation id="Animation-1" />
            { playSecondAnimation ? <Animation id="Animation-2" /> : '' }
            <img id="Winner-Poster" src={ winner.posterURL } />
            <Button id="Rent-Buy-Btn" classes="Button1" title="STREAMING INFO" clicked={ showStreamingInfoModal } />
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
        onUpdateCurrentMovieIndex: ( movieIndex ) => dispatch( Actions.updateCurrentMovieIndex( movieIndex )),
        onUpdateShowStreamingInfoModal: ( show ) => dispatch( Actions.updateShowStreamingInfoModal( show ))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Winner);