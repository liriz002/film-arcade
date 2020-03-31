import React from 'react';
import ReactModal from 'react-modal';
import Genre from '../../Genre/Genre';
import Button from '../Button/Button';
import { connect } from 'react-redux';

import './Modals.css';
import * as Constants from '../../../utils/constants';
import * as Actions from '../../../store/actions/actions';
import { bindActionCreators } from 'redux';

const GenresModal = ( props: any ) => {

    const saveGenres = () => {
        console.log('save genres');
        props.onUpdateShowGenresModal( false );
    };

    return (
        <ReactModal id="Genres-Modal" isOpen={ props.isOpen } closeTimeoutMS={ Constants.Global.MODALS_ANIMATION_TIME_IN_MS }>
        <h2>What's for tonight?</h2>

        <div id="All-Genres-Container">
            { Constants.ALL_GENRES.map(( genre, index ) => {
                return (
                    <span className="Genre-Container">
                        <Genre key={ genre } name={ genre } isSelected={ false } />
                    </span>
                );
            }) }
          </div>

          <Button clicked={ saveGenres } classes="Button1" title="Any Genres" />
        </ReactModal>
    );
};


function mapStateToProps( state: any ) {
    return {

    };
}

function mapDispatchToProps( dispatch: any ) {
    return {
        onUpdateShowGenresModal: ( show: any ) => dispatch({ type: Actions.UPDATE_SHOW_GENRES_MODAL, show: show })
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(GenresModal);