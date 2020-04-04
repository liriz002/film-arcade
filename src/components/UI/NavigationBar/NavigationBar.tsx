import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '../Button/Button';
import { Redirect } from 'react-router-dom';
import * as Actions from '../../../store/actions/actions';

import './NavigationBar.css';

const NavigationBar = ( props: any ) => {
    const [ redirectToVoting, setRedirectToVoting ] = useState( false );

    // Updates the state to show the genres modal
    const showGenresModal = () => {
        props.onUpdateShowGenresModal( true );
    }

    const goToVoting = () => {
        setRedirectToVoting( true );
    }

    // If we should be going to the voting UI, we redirect the user to it
    if ( redirectToVoting ) {
        return (
            <Redirect to="/movies-voting" />
        )
    }

    return (
        <div>
            <div className="Navigation-Bar" style={ props.isOpen ? { zIndex: 1000 } : { zIndex: 0 } }>
                <span id="Nav-Logo">
                    <img id="Logo-Image" src="https://image.flaticon.com/icons/svg/2148/2148668.svg" />
                    <h3 id="App-Title">HOME THEATER ARCADE</h3>
                </span>
            <Button id="Voting-Btn" clicked={ goToVoting } classes="Button1" title="Voting" />
            <Button id="Filters-Button" clicked={ showGenresModal } classes="Button1" title="Filter Genres" />
            </div>
       </div>
    );
};

function mapStateToProps( state: any ) {
    return {
        showGenresModal: state.globalProps.showGenresModal,
    };
}

function mapDispatchToProps( dispatch: any ) {
    return {
        onUpdateShowGenresModal: ( show: boolean ) => dispatch( Actions.updateShowGenresModal( show ) ),
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( NavigationBar );