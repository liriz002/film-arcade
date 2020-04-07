import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'; 
import { Animation } from '../../Lottie/Winner/Winner';
import { Motion, spring } from 'react-motion';
import Button from '../../UI/Button/Button';
import * as Constants from '../../../utils/constants';

import * as Actions from '../../../store/actions/actions';
import './Winner.css';

const Winner = ( props ) => {
    const [ playFirstAnimation, setPlayFirstAnimation ] = useState( false );
    const [ playSecondAnimation, setPlaySecondAnimation ] = useState( false );
    const winner = props.movies[ props.winningMovieIndex ];
    let audio = new Audio('/sounds/winner.wav');

    useEffect(() => {
        setTimeout(() => {
            // We play the winner audio sound
            audio.play();
            setTimeout(() => {
                // Play the first animation
                setPlayFirstAnimation( true );

                setTimeout(() => {
                    // Then we play the second one
                    setPlaySecondAnimation( true );
                }, 500)
            }, 500);
        }, 250);
    }, []);

    // If there's not a winning movie, we redirect to the homepage
    if ( props.movies.length === 0 || props.winningMovieIndex === -1 ) {
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
            <div className="Movie-Backdrop" id="Winner-Backdrop" style={ { 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: Constants.CSS.MOVIE_DARK_GRADIENTS +  'url(' + winner.backdropImageURL + ')'
            }}>
                <div className="Movie-Backdrop-Overlay">
                    <h2 id="Enjoy-Show-Header">Enjoy the show!</h2>
                    { playFirstAnimation ? <Animation id="Animation-1" /> : '' }
                    { playSecondAnimation ? <Animation id="Animation-2" /> : '' }
                    <Motion defaultStyle={{ opacity: 0, x: -100, y: -50 }  } style={ { opacity: spring(1), x: spring( -50, Constants.Animations.STIFFNESS_DAMPING  ), y: -50 } }>
                    { style => (
                    <div class="Winner-Poster-Container" style={{ opacity: style.opacity, transform: `translate(${style.x}%, ${style.y}%)` }}>
                        <img alt={ winner.title } id="Winner-Poster" src={ winner.posterURL } />
                    </div>
                    )}
                    </Motion>

                    <Motion defaultStyle={{ opacity: 0, bottom: -3 }  } style={ { opacity: spring(1), bottom: spring( 3, Constants.Animations.STIFFNESS_DAMPING  ) } }>
                    { style => (
                        <Button style={{ transform: `translate(${ style.bottom }%)` }} id="Rent-Buy-Btn" classes="Button3" title="Stream" clicked={ showStreamingInfoModal } />
                    )}
                    </Motion>
                </div>
            </div>
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