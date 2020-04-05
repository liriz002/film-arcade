import React, { useState, useEffect, useRef } from 'react';
import Timer from '../../components/Timer/Timer'; 
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as Constants from '../../utils/constants';
import * as Actions from '../../store/actions/actions';

import './Voting.css';

const Voting = ( props: any ) => {
    const leftMovieRef: any = useRef( null );
    const rightMovieRef: any = useRef( null );

    const [ sideToRefresh, updateSideToRefresh ] = useState( "" );
    const [ latestMovieShownIndex, updateLatestMovieShownIndex ] = useState( 1 );
    const [ winningMovieIndex, updateWinningMovieIndex ] = useState( 0 );
    const [ leftProps, updateLeftProps ] = useState({ alt: '', src: '', background: '' });
    const [ rightProps, updateRightProps ] = useState({ alt: '', src: '', background: '' });
    const [ showTimer, updateShowTimer ] = useState( true );

    const completeVote = ( event: any ) => {
        const [ sideClicked, winningIndex ] = event.target.alt.split("-");

        updateSideToRefresh( sideClicked == "right" ? "left" : "right" );
        updateLatestMovieShownIndex( latestMovieShownIndex + 1 )
        updateWinningMovieIndex( winningIndex );
        updateShowTimer( false );

        // We then show the timer again after we set it to false above so that we can unmount it and get it reset for just a bit
        setTimeout(() => {
            updateShowTimer( true );
        }, 500 );
    }

    // We select one of the movies at random by simulating a click on one of the images
    const timerTicked = () => {
        let randomInt = Math.round(Math.random());
        
        if ( randomInt == 0 ) {
            leftMovieRef.current.click();
        } else {
            rightMovieRef.current.click();
        }
    }

    useEffect(() => {
        // Add event listeners for when a key is pressed
        window.addEventListener('keydown', handleKeyboardVote);
        return () => {
            window.removeEventListener('keydown', handleKeyboardVote);
        };
    })

    // Votes with the keyboard
    const handleKeyboardVote = ( e: any ) => {
        if ( e.keyCode == 37 ) {
            leftMovieRef.current.click();
        } else if ( e.keyCode == 39 ) {
            rightMovieRef.current.click();
        }
    };

    let votingHTML;
    let timer;

    if ( showTimer ) {
        timer = <Timer onTick={ timerTicked } />
    }

    // If there are no movies to vote for, we return, as the user should not be here
    if ( props.votingMovies.length == 0 ) {
        return (
            <Redirect to="/" />
        )
    } else {

        if ( latestMovieShownIndex == props.votingMovies.length ) {
            // If we reached the last movie, we are done, so we update the state to reflect we have a winning movie
            props.onUpdateWinningMovie( winningMovieIndex );

            // Then, we redirect to the winner screen
            return (
                <Redirect to="/winner" />
            )
        } else {
            let leftProps = { alt: '', src: '', background: '' }
            let rightProps = { alt: '', src: '', background: '' }

            if ( sideToRefresh == "" ) {
                // If we are on the first pass, we assign the attributes of the first and second movie, accordingly
                leftProps = { alt: "left-0", src: props.votingMovies[ 0 ].posterURL, background: props.votingMovies[ 0 ].backdropImageURL };
                rightProps = { alt: "right-1", src: props.votingMovies[ 1 ].posterURL, background: props.votingMovies[ 1 ].backdropImageURL }
            } else {
                // We are not on the first pass and the user has voted, so we only update one of the sides
                if ( sideToRefresh == "left" ) {
                    // Updating left-hand side
                    leftProps = { alt: "left-" + latestMovieShownIndex, src: props.votingMovies[ latestMovieShownIndex ].posterURL, background: props.votingMovies[ latestMovieShownIndex ].backdropImageURL }
                    // We keep the right-hand side the same
                    rightProps = { alt: "right-" + winningMovieIndex, src: props.votingMovies[ winningMovieIndex ].posterURL, background: props.votingMovies[ winningMovieIndex ].backdropImageURL }
                } else {
                    // Updating right-hand side
                    rightProps = { alt: "right-" + latestMovieShownIndex, src: props.votingMovies[ latestMovieShownIndex ].posterURL, background: props.votingMovies[ latestMovieShownIndex ].backdropImageURL }
                    // We keep the left-hand side the same
                    leftProps = { alt: "left-" + winningMovieIndex, src: props.votingMovies[ winningMovieIndex ].posterURL, background: props.votingMovies[ winningMovieIndex ].backdropImageURL }
                }
            }
            
            // We have more movies for voting, so we update the posters
            votingHTML = 
            <div className="Movie-Backdrop" style={ { 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: Constants.CSS.MOVIE_DARK_GRADIENTS
            }}>
                { timer }
    
                <div className="Movie-Voting-Container Left-Movie" style={ { 
                    backgroundSize: 'cover',
                    backgroundImage: Constants.CSS.MOVIE_DARK_GRADIENTS +  'url(' + leftProps.background + ')'
                    }}>
                    <div className="Movie-Backdrop-Overlay">
                        <div className="Movie-Voting-Details">
                            <img id="Left-Movie" onClick={ completeVote } alt={ leftProps.alt } className="Movie-Voting-Poster" src={ leftProps.src } ref={ leftMovieRef } />
                        </div>
                    </div>
                </div>
                <div className="Movie-Voting-Container Right-Movie" style={ { 
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: Constants.CSS.MOVIE_DARK_GRADIENTS +  'url(' + rightProps.background + ')'
                }}>
                    <div className="Movie-Backdrop-Overlay">
                        <div className="Movie-Voting-Details">
                            <img id="Right-Movie" onClick={ completeVote } alt={ rightProps.alt } className="Movie-Voting-Poster" src={ rightProps.src } ref={ rightMovieRef } />
                        </div>
                    </div>
                </div>
            </div>
        }
    }

    return (
        <div>
            { votingHTML }
        </div>
    )
};

function mapStateToProps( state: any ) {
    return {
        votingMovies: state.movieData.votingMovies
    };
}

function mapDispatchToProps( dispatch: any ) {
    return {
        onUpdateWinningMovie: ( winningMovieIndex: number ) => dispatch( Actions.updateWinningMovie( winningMovieIndex )) 
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Voting);