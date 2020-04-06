import React from 'react';
import ReactModal from 'react-modal';
import Genre from '../../Genre/Genre';
import Button from '../Button/Button';
import { connect } from 'react-redux';

import './Modals.css';
import * as Constants from '../../../utils/constants';
import * as Actions from '../../../store/actions/actions';

const GenresModal = ( props: any ) => {
    const saveGenres = () => {
        props.onUpdateShouldApplyFilter( true );
        props.onUpdateShowGenresModal( false );
    };

    const closeModal = () => {
        props.onUpdateFilterString( '' );
        props.onUpdateShowGenresModal( false );
    }

    const getNumOfGenresSelected = () => {
        return props.filterString.split("|").length - 1
    }

    return (
        <ReactModal id="Genres-Modal" isOpen={ props.isOpen } closeTimeoutMS={ Constants.Global.MODALS_ANIMATION_TIME_IN_MS }>
            <div className="Modal-Title-Container">
                <h2>What's for tonight?</h2>
            </div>

        <div className="Modal-Content-Container">
            <div id="All-Genres-Container">
                <div className="Genre-Row">
                    <Genre key={ "Action" } name={ "Action" } isSelected={ props.filterString.includes( "Action" ) } />
                    <Genre key={ "Adventure" } name={ "Adventure" } isSelected={ props.filterString.includes( "Adventure" ) } />
                    <Genre key={ "Animation" } name={ "Animation" } isSelected={ props.filterString.includes( "Animation" ) } />
                    <Genre key={ "Comedy" } name={ "Comedy" } isSelected={ props.filterString.includes( "Comedy" ) } />
                </div>
                <div className="Genre-Row">
                    <Genre key={ "Crime" } name={ "Crime" } isSelected={ props.filterString.includes( "Crime" ) } />
                    <Genre key={ "Drama" } name={ "Drama" } isSelected={ props.filterString.includes( "Drama" ) } />
                    <Genre key={ "Family" } name={ "Family" } isSelected={ props.filterString.includes( "Family" ) } />
                    <Genre key={ "Fantasy" } name={ "Fantasy" } isSelected={ props.filterString.includes( "Fantasy" ) } />
                </div>
                <div className="Genre-Row">
                    <Genre key={ "Horror" } name={ "Horror" } isSelected={ props.filterString.includes( "Horror" ) } />
                    <Genre key={ "Romance" } name={ "Romance" } isSelected={ props.filterString.includes( "Romance" ) } />
                    <Genre key={ "Science Fiction" } name={ "Science Fiction" } isSelected={ props.filterString.includes( "Science Fiction" ) } />
                    <Genre key={ "Thriller" } name={ "Thriller" } isSelected={ props.filterString.includes( "Thriller" ) }  />
                </div>
            </div>
            <hr />
          </div>

          <Button classes="Button Modal-Right-Btn Button1" title={ ( props.filterString == '' ) ? 'All Genres' : ( 'Apply ' + getNumOfGenresSelected() + ' Genre' + ( getNumOfGenresSelected() > 1 ? 's' : '' )) } clicked={ saveGenres }></Button>
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
        onUpdateShouldApplyFilter: ( shouldApplyFilter: boolean ) => dispatch( Actions.updateShouldApplyFilter( shouldApplyFilter ) ),
        onUpdateFilterString: ( filterStr: string ) => dispatch( Actions.updateFilterString( filterStr ) )
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(GenresModal);