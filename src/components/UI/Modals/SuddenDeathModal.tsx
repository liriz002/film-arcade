import React from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import Button from '../Button/Button';

import * as Actions from '../../../store/actions/actions';
import * as Constants from '../../../utils/constants';

const SuddenDeathModal = ( props: any ) => {

    const startSuddenDeath = () => {
        props.onStartSuddenDeath();
    };

    const closeModal = () => {
        props.onUpdateShowSuddenDeathModal( false );
    };

    const selectLeftTheatersOnly = () => {
        props.onUpdateVotingMovies( JSON.parse( JSON.stringify( props.leftTheaterMovies ))) ;
        startSuddenDeath();
    };

    const selectAtTheatersOnly = () => {
        props.onUpdateVotingMovies( JSON.parse( JSON.stringify( props.atTheaterMovies )));
        startSuddenDeath();
    };

    const selectBothMovieSets = () => {
        props.onUpdateVotingMovies([ ...props.leftTheaterMovies, ...props.atTheaterMovies ]);
        startSuddenDeath();
    };

    return (
        <ReactModal id="Sudden-Death-Modal" isOpen={ props.isOpen } closeTimeoutMS={ Constants.Global.MODALS_ANIMATION_TIME_IN_MS } ariaHideApp={ false }>
            <div className="Modal-Title-Container">
                <h2>Sudden Death</h2>
                <div className="Close-Modal-Icon-Container" onClick={ closeModal }>
                    <img alt="Close Icon" className="Close-Modal-Icon" src="/images/icons/cross.png" />
                </div>
            </div>
            <div className="Modal-Content-Container">
                <div className="Modal-Section">
                    <h3>How It Works</h3>
                    <p>In Sudden Death, you vote on 2 movies at a time, until you get to a winner. Any active genre filters will be taken into account.</p>
                </div>
                <div className="Modal-Section">
                    <h3>On Voting</h3>
                    <p>The easiest way to vote is with the left and right arrows on your keyboard. You can also vote by clicking movie posters.</p>
                </div>
                <div className="Modal-Section">
                    <h3>Time Limit</h3>
                    <p>If you don't vote within 5 seconds, a vote will be cast randomly for you.</p>
                </div>
                <hr />
            </div>
            <div className="Modal-Btn-Container">
                <div>
                    <Button classes="Button Modal-Right-Btn Button1" title="Both" clicked={ selectBothMovieSets } disabled={ ( props.leftTheaterMovies.length + props.atTheaterMovies.length < 2 ) || props.leftTheaterMovies.length === 0 || props.atTheaterMovies.length === 0 ? true : false } ></Button>
                    <Button classes="Button Modal-Right-Btn Button2" title="Won't-Break-Bank" clicked={ selectLeftTheatersOnly } disabled={ ( props.leftTheaterMovies.length < 2 ) ? true : false }></Button>
                    <Button classes="Button Modal-Right-Btn Button3" title="Theater-At-Home" clicked={ selectAtTheatersOnly } disabled={ ( props.atTheaterMovies.length < 2 ) ? true : false } ></Button>
                </div>
            </div>
        </ReactModal>
    )
}

function mapStateToProps( state: any ) {
    return {
        movies: state.movieData.movies,
        atTheaterMovies: state.movieData.atTheaterMovies,
        leftTheaterMovies: state.movieData.leftTheaterMovies
    };
}

function mapDispatchToProps( dispatch: any ) {
    return {
        onStartSuddenDeath: () => dispatch( Actions.startSuddenDeath() ),
        onUpdateShowSuddenDeathModal: ( show: boolean ) => dispatch( Actions.updateShowSuddenDeathModal( show ) ),
        onUpdateVotingMovies: ( movies: any ) => dispatch( Actions.updateVotingMovies( movies ))
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( SuddenDeathModal );