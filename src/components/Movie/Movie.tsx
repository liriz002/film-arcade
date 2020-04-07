import React from 'react';
import Button from '../UI/Button/Button';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';
import * as Constants from '../../utils/constants';
import * as Functions from '../../utils/functions';
import { Redirect } from 'react-router-dom';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import './Movie.css';
import "react-circular-progressbar/dist/styles.css";

const Movie = ( props: any ) => {
    // Functions
    // Sets the state to send the user home
    const goHome = () => {
        props.onUpdateShowMovieModal( false );
    };

    const showStreamingInfoModal = () => {
        props.onUpdateShowStreamingInfoModal( true );
    };

    // If the user clicked on Home or if there are no movies, we return to the homepage
    if ( props.movies.length === 0 ) {
        return (
            <Redirect to="/" />
        )
    }

    let movieIndex = props.movieIndex;
    let currentMovie = props.movies[ movieIndex ];

    let genresHTML =      
    <p id="Genres"> { Functions.getGenresArray( currentMovie.genre1Name, currentMovie.genre2Name, currentMovie.genre3Name, currentMovie.genre4Name ).map(( genre, index ) => {
        if ( index === 0) {
            return (
                <span>{ genre } </span>
            );
        } else {
            return (
               <span><span className="Genre-Divider">/</span> { genre } </span>
            )
        }
    }) }</p>  
    
    let HTML;
    if ( currentMovie == null ) {
        HTML = <div></div>
    } else {
        HTML =
        <div className="Movie-Backdrop" style={ { 
           backgroundSize: 'cover',
            backgroundImage: Constants.CSS.MOVIE_DARK_GRADIENTS +  'url(' + currentMovie.backdropImageURL + ')'
         } } >
            <div className="Movie-Backdrop-Overlay">
                <div id="Movie-Container">
                    <div id="Movie-Poster-Container">
                        <img alt={ currentMovie.title } id="Movie-Poster" src={ currentMovie.posterURL } /> 
                    </div>
                    <div id="Movie-Details-Container">
                        <h2>{ currentMovie.title } ({ currentMovie.releaseYear })</h2>
                        <CircularProgressbar className="Rating-Progress-Bar" value={ currentMovie.tmdbRating * 10 } text={`${ currentMovie.tmdbRating.toFixed( 1 ) }`} strokeWidth={9} styles={ buildStyles({
                            textSize: '36px',
                            textColor: 'white',
                            pathColor: '22abfb',
                            trailColor: 'transparent'
                        })  } />
                        { genresHTML }
                        <p id="Runtime">{ Functions.getHoursAndMinutesFromMinutes( currentMovie.runtime ) }</p>
                        <p id="Movie-Overview">{ currentMovie.overview }</p>
                        <a href={ currentMovie.trailerURL } target="_blank"><button className="Button1" id="Trailer-Button">Watch Trailer</button></a>
                        <Button classes="Button3" id="Streaming-Info-Btn" clicked={ showStreamingInfoModal } title="Streaming Info" />
                    </div>
                </div>

            <Button id="Home-Button" classes="Button4" clicked={ goHome } title="Home" />
            </div>
        </div>
    }

    return (
        <div>
        { HTML }
        </div>
    )
};

function mapStateToProps( state: any ){
    return {
        movieIndex: state.globalProps.currentMovieIndex,
        movies: state.movieData.movies
    };
};

function mapDispatchToProps( dispatch: any ) {
    return {
        onUpdateShowMovieModal: ( show: boolean ) => dispatch( actions.updateShowMovieModal( show )),
        onUpdateShowStreamingInfoModal: ( show: boolean ) => dispatch( actions.updateShowStreamingInfoModal( show ))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
