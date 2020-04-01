import React from 'react';
import CastMember from './CastMember/CastMember';
import Button from '../UI/Button/Button';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';
import * as Constants from '../../utils/constants';
import * as Functions from '../../utils/functions';
import { useSpring, animated } from 'react-spring';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { easeQuadInOut, easeBounce, easeCubic, easeElastic, easeLinear } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import ChangingProgressProvider from "./ChangingProgressProvider";

import './Movie.css';
import "react-circular-progressbar/dist/styles.css";

const Movie = ( props: any ) => {

    let movieIndex = props.movieIndex;
    let currentMovie = props.movies[ movieIndex ];

    if ( currentMovie == null ) {
        currentMovie = {};
        currentMovie.genre1Name = "Comedy";
        currentMovie.genre2Name = "Drama";
    }

    console.log(currentMovie);

    const animatedProps = useSpring({ opacity: 1, from: { opacity: 0 } })
    // 

    let genresHTML = 
     <p id="Genres"> { Functions.getGenresArray( currentMovie.genre1Name, currentMovie.genre2Name, currentMovie.genre3Name ).map(( genre, index ) => {
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



    
    const nextMovie = () => {
        props.onIncrementCurrentMovieIndex( );
    };
    
    let HTML;
    if ( currentMovie == null ) {
        HTML = <p>No data yet</p>
    } else {
        HTML =
        <div className="Movie-Backdrop" style={ { 
           backgroundSize: 'cover',
            backgroundImage: Constants.CSS.MOVIE_DARK_GRADIENTS +  'url(' + currentMovie.backdropImageURL + ')'
           //backgroundImage: `url(${ currentMovie.backdropImageURL })`
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
                                    text={`${ currentMovie.tmdbRating }`}
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
                        <Button className="Button1" clicked={ nextMovie } title="Next" />
                    </div>
                </animated.div>
            </div>
        </div>

    }

    return (
        <div>
        <div className="Movie-Backdrop" style={ { 
           backgroundSize: 'cover',
            backgroundImage: Constants.CSS.MOVIE_DARK_GRADIENTS + (currentMovie ? 'url(' + currentMovie.backdropImageURL +')' :  'url(https://image.tmdb.org/t/p/original/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg)')
           //backgroundImage: `url(${ currentMovie.backdropImageURL })`
         } } >
            <div className="Movie-Backdrop-Overlay">
                <animated.div key={ props.movieIndex } id="Movie-Container" style={ animatedProps }>
                    <div id="Movie-Poster-Container">
                        <img id="Movie-Poster" src={ currentMovie ? currentMovie.posterURL : 'https://image.tmdb.org/t/p/original/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg'} /> 
                    </div>
                    <div id="Movie-Details-Container">
                        <h2>{ currentMovie ? currentMovie.title : 'Parasite (2019)' }</h2>
                        <AnimatedProgressProvider
                            valueStart={0}
                            valueEnd={ currentMovie ? currentMovie.tmdbRating * 10 : 8.6 }
                            duration={1.5}
                            easingFunction={easeLinear}>
                                
                            {(value: any) => {
                             const roundedValue = Math.round(value);
                                return (
                                    <CircularProgressbar
                                    className="Rating-Progress-Bar"
                                    value={ currentMovie ? currentMovie.tmdbRating * 10 : 86 }
                                    text={`${ currentMovie ? currentMovie.tmdbRating : 8.6 }`}
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
                        <p id="Runtime">{ currentMovie ? Functions.getHoursAndMinutesFromMinutes( currentMovie.runtime ) : '2h 2m' }</p>
                        <p id="Movie-Overview">{ currentMovie ? currentMovie.overview : "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident." }</p>
                        <a href="" target="_blank"><button id="Trailer-Button">Watch Trailer</button></a>
                        <Button className="Button1" clicked={ nextMovie } title="Next" />
                    </div>
                </animated.div>
            </div>
        </div>
        </div>
    )
};

function mapStateToProps( state: any ){
    return {
        movieIndex: state.movieData.currentMovieIndex,
        movies: state.movieData.movies
    };
};

function mapDispatchToProps( dispatch: any ) {
    return {
        onIncrementCurrentMovieIndex: () => dispatch( actions.incrementCurrentMovieIndex() )
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