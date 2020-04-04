import React from 'react';
import Timer from '../../components/Timer/Timer'; 
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as Constants from '../../utils/constants';

import './Voting.css';

const Voting = ( props: any ) => {

    const completeVote = ( event: any ) => {
        console.log(event.target.alt);
    }

    let votingHTML;

    // If there are no movies to vote for, we return, as the user should not be here
    if ( props.votingMovies.length == 0 ) {
        return (
            <Redirect to="/" />
        )
    } else {

        if ( props.latestMovieShownIndex == props.votingMovies.length ) {
            // If we reached the last movie, we are done, so we redirect the user to the winner screen
            alert('done');
        } else {
            

            votingHTML = 
            <div className="Movie-Backdrop" style={ { 
                backgroundSize: 'cover',
                backgroundImage: Constants.CSS.MOVIE_DARK_GRADIENTS
            } }>
                <Timer />
    
                <div className="Movie-Voting-Container Left-Movie">
                    <div className="Movie-Backdrop-Overlay">
                        <div className="Movie-Voting-Details">
                            <img onClick={ completeVote } alt="left" className="Movie-Voting-Poster" src={ props.latestMovieShownIndex == 1 ? props.votingMovies[ 0 ].posterURL : props.votingMovies[ 0 ].posterURL } />
                        </div>
                    </div>
                </div>
                <div className="Movie-Voting-Container Right-Movie">
                    <div className="Movie-Backdrop-Overlay">
                        <div className="Movie-Voting-Details">
                            <img onClick={ completeVote } alt="right" className="Movie-Voting-Poster" src={ props.latestMovieShownIndex == 1 ? props.votingMovies[ 1 ].posterURL : props.votingMovies[ 1 ].posterURL } />
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
        votingMovies: state.voting.votingMovies,
        winningMovieIndex: state.voting.winningMovieIndex,
        latestMovieShownIndex: state.voting.latestMovieShownIndex
    };
}

function mapDispatchToProps( dispatch: any ) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Voting);