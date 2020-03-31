import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { easeQuadInOut, easeBounce, easeCubic, easeElastic, easeLinear } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import ChangingProgressProvider from "./ChangingProgressProvider";

import './Movie.css';
import "react-circular-progressbar/dist/styles.css";

const Movie = ( ) => {
    return (
        <div className="Movie-Backdrop">
            <div className="Movie-Backdrop-Overlay">
                <div id="Movie-Container">
                    <div id="Movie-Poster-Container">
                        <img id="Movie-Poster" src="https://image.tmdb.org/t/p/w1280/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg" /> 
                    </div>
                    <div id="Movie-Details-Container">
                        <h2>Parasite</h2>
                        <p>Comedy, Thriller, Drama</p>
                        <AnimatedProgressProvider
                            valueStart={0}
                            valueEnd={85}
                            duration={1.4}
                            easingFunction={easeLinear}>
                                
                            {(value: any) => {
                             const roundedValue = Math.round(value);
                                return (
                                    <CircularProgressbar
                                    className="Rating-Progress-Bar"
                                    value={value}
                                    text={`${roundedValue/10}`}
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

                        <p>All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.</p>
                        <button id="Trailer-Button">Watch Trailer</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Movie;

/*


                        <CircularProgressbar className="Rating-Progress-Bar" value={85} text={`${8.5}`} strokeWidth={9} styles={ buildStyles({
                            textSize: '36px',
                            textColor: 'white',
                            pathColor: '22abfb',
                            trailColor: 'transparent'
                        })  } />

*/