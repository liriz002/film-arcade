import React, { useState, useEffect } from 'react';
import CastMember from './CastMember/CastMember';
import Button from '../UI/Button/Button';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';
import * as Constants from '../../utils/constants';
import * as Functions from '../../utils/functions';
import { useSpring, animated } from 'react-spring';
import { Redirect } from 'react-router-dom';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { easeQuadInOut, easeBounce, easeCubic, easeElastic, easeLinear } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import ChangingProgressProvider from "./ChangingProgressProvider";

import './Movie.css';
import "react-circular-progressbar/dist/styles.css";

const Movie = ( props: any ) => {
    const [ state, setState ] = useState({ goHome: false });

    // Functions
    // Sets the state to send the user home
    const goHome = () => {
        // setState({ goHome: true });
        props.onUpdateShowMovieModal( false );
    };

    const showStreamingInfoModal = () => {
        props.onUpdateShowStreamingInfoModal( true );
    };

    // If the user clicked on Home or if there are no movies, we return to the homepage
    if ( state.goHome || props.movies.length == 0 ) {
        return (
            <Redirect to="/" />
        )
    }

    let movieIndex = props.movieIndex;
    let currentMovie = props.movies[ movieIndex ];

    // const animatedProps = useSpring({ opacity: 1, from: { opacity: 0 } })

    let genresHTML =      
    <p id="Genres"> { Functions.getGenresArray( currentMovie.genre1Name, currentMovie.genre2Name, currentMovie.genre3Name, currentMovie.genre4Name ).map(( genre, index ) => {
        if ( index == 0) {
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
                <animated.div id="Movie-Container">
                    <div id="Movie-Poster-Container">
                        <img id="Movie-Poster" src={ currentMovie.posterURL } /> 
                    </div>
                    <div id="Movie-Details-Container">
                        <h2>{ currentMovie.title } ({ currentMovie.releaseYear })</h2>
                        <AnimatedProgressProvider
                            valueStart={0}
                            valueEnd={ currentMovie.tmdbRating * 10 }
                            duration={1.5}
                            easingFunction={easeLinear}>
                                
                            {(value: any) => {
                             const roundedValue = Math.round(value);
                                return (
                                    <CircularProgressbar
                                    className="Rating-Progress-Bar"
                                    value={ currentMovie.tmdbRating * 10 }
                                    text={`${ currentMovie.tmdbRating.toFixed( 1 ) }`}
                                    /* This is important to include, because if you're fully managing the
                                animation yourself, you'll want to disable the CSS animation. */
                                    styles={buildStyles({ 
                                        pathTransition: "none",
                                        textSize: '36px',
                                        textColor: 'white',
                                        pathColor: '22abfb',
                                        trailColor: 'transparent'
                                     })}
                                    />
                                );
                            }}
                        </AnimatedProgressProvider>
                        { genresHTML }
                        <p id="Runtime">{ Functions.getHoursAndMinutesFromMinutes( currentMovie.runtime ) }</p>
                        <p id="Movie-Overview">{ currentMovie.overview }</p>
                        <a href={ currentMovie.trailerURL } target="_blank"><button id="Trailer-Button">Watch Trailer</button></a>
                        <Button id="Streaming-Info-Btn" clicked={ showStreamingInfoModal } title="Streaming Info" />
                    </div>
                </animated.div>

            <Button id="Home-Button" className="Button1" clicked={ goHome } title="Home" />
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


/*





'Comedy <span className="Genre-Divider">/</span> Thriller <span className="Genre-Divider">/</span> Drama</p>' 


                        <CircularProgressbar className="Rating-Progress-Bar" value={85} text={`${8.5}`} strokeWidth={9} styles={ buildStyles({
                            textSize: '36px',
                            textColor: 'white',
                            pathColor: '22abfb',
                            trailColor: 'transparent'
                        })  } />




                                                <div>
                            <h3>Main Cast</h3>
                            <CastMember name="Bong Joon-ho" imageURL="https://image.tmdb.org/t/p/w1280/stwnTvZAoD8gEJEDHpDQyLCyDy5.jpg" />
                            <CastMember name="Song Kang-ho" imageURL="https://image.tmdb.org/t/p/w1280/714R0wEx5SJ9o7l1Zfs37jTc8hi.jpg" />
                            <CastMember name="Lee Sun-kyun" imageURL="https://image.tmdb.org/t/p/w1280/nnwVLKIQPYoF88ohshnFfbSB0UW.jpg" />
                            <CastMember name="Cho Yeo-jeong" imageURL="https://image.tmdb.org/t/p/w1280/5MgWM8pkUiYkj9MEaEpO0Ir1FD9.jpg" />
                            <CastMember name="Choi Woo-shik" imageURL="https://image.tmdb.org/t/p/w1280/hfskkkziJrGwobqik02RSoyt6v0.jpg" />
                            <CastMember name="Park So-dam" imageURL="https://image.tmdb.org/t/p/w1280/uWppIvypWODMjCxiGDWX92y86ci.jpg" />
                        </div>

*/