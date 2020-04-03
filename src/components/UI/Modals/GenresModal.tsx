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

        props.onUpdateShouldApplyFilter( true );
        props.onUpdateShowGenresModal( false );
    };

    const addGenre = () => {
        console.log('added genre');
    };

    return (
        <ReactModal id="Genres-Modal" isOpen={ props.isOpen } closeTimeoutMS={ Constants.Global.MODALS_ANIMATION_TIME_IN_MS }>
        <h2>What's for tonight?</h2>

        <div id="All-Genres-Container">
            { Constants.ALL_GENRES.map(( genre, index ) => {
                return (
                    <span className="Genre-Container">
                        <Genre key={ genre } name={ genre } isSelected={ props.filterString.includes( genre ) } clicked={ addGenre } />
                    </span>
                );
            }) }
          </div>

          <Button clicked={ saveGenres } classes="Button1" title={ ( props.filterString == '' ) ? 'All Genres' : 'Apply Genres' } />
        </ReactModal>
    );
};


function mapStateToProps( state: any ) {
    return {
        filterString: state.movieData.filterString
    };
}

function mapDispatchToProps( dispatch: any ) {
    return {
        onUpdateShowGenresModal: ( show: any ) => dispatch({ type: Actions.UPDATE_SHOW_GENRES_MODAL, show: show }),
        onUpdateShouldApplyFilter: ( shouldApplyFilter: boolean ) => dispatch( Actions.updateShouldApplyFilter( shouldApplyFilter ) )
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(GenresModal);