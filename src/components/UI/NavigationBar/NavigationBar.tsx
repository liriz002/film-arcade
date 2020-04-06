import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '../Button/Button';
import { Redirect } from 'react-router-dom';
import * as Actions from '../../../store/actions/actions';

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

    return (
        <div>
            <div className="Navigation-Bar" style={ props.isOpen ? { zIndex: 1000 } : { zIndex: 0 } }>
                <span id="Nav-Logo">
                    <img id="Logo-Image" src="https://image.flaticon.com/icons/svg/2148/2148668.svg" />
                    <h3 id="App-Title">HOME THEATER ARCADE</h3>
                </span>
            <Button id="Voting-Btn" clicked={ showSuddenDeathModal } classes="Button1" title="Sudden Death" />
            <Button id="Filters-Button" clicked={ showGenresModal } classes="Button1" title="Filter Genres" />
            </div>
       </div>
    );
};

function mapDispatchToProps( dispatch: any ) {
    return {
        onUpdateShowGenresModal: ( show: boolean ) => dispatch( Actions.updateShowGenresModal( show ) ),
        onUpdateShowSuddenDeathModal: ( show: boolean ) => dispatch( Actions.updateShowSuddenDeathModal( show ) )
    };
}

export default connect( null, mapDispatchToProps )( NavigationBar );