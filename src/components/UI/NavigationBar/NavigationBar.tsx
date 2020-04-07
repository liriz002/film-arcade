import React from 'react';
import { connect } from 'react-redux';
import Button from '../Button/Button';
import * as Actions from '../../../store/actions/actions';
import { Motion, spring } from 'react-motion';

import './NavigationBar.css';

const NavigationBar = ( props: any ) => {
    // Updates the state to show the genres modal
    const showGenresModal = () => {
        props.onUpdateShowGenresModal( true );
    }

    // Updates state to show the sudden death modal
    const showSuddenDeathModal = () => {
        props.onUpdateShowSuddenDeathModal( true );
    }

    let buttons;
    if ( props.movies.length > 0 ) {
        buttons = 
        <Motion defaultStyle={{ x: -200, opacity: 0 }  } style={ { x: spring(0, { stiffness: 60, damping: 11 } ), opacity: spring(1) } }>
            { style => (
            <div style={{
                // transform: `translateX(${style.x}px)`,
                opacity: style.opacity
            }}>
                <Button id="Voting-Btn" clicked={ showSuddenDeathModal } classes={ "Button2" + ( props.movies.length === 0 ? ' Hide' : '' ) } title="Sudden Death" />
                <Button id="Filters-Button" clicked={ showGenresModal } classes={ "Button1" + ( props.movies.length === 0 ? ' Hide' : '' ) }  title="Filter Genres" disabled={  props.movies.length === 0} />
            </div>
            )}
        </Motion>
    }

    return (
        <div>
            <div className="Navigation-Bar" style={ props.isOpen ? { zIndex: 1000 } : { zIndex: 0 } }>
                <span id="Nav-Logo">
                    <img alt="Home Theater Arcade" id="Logo-Image" src="/images/icons/logo.png" />
                    <h3 id="App-Title">Home Theater Arcade</h3>
                </span>
                { buttons }
            </div>
       </div>
    );
};

function mapStateToProps( state: any ) {
    return {
        movies: state.movieData.movies
    };
}

function mapDispatchToProps( dispatch: any ) {
    return {
        onUpdateShowGenresModal: ( show: boolean ) => dispatch( Actions.updateShowGenresModal( show ) ),
        onUpdateShowSuddenDeathModal: ( show: boolean ) => dispatch( Actions.updateShowSuddenDeathModal( show ) )
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( NavigationBar );