import React from 'react';
import ReactModal from 'react-modal';
import Button from '../Button/Button';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as Actions from '../../../store/actions/actions';
import * as Constants from '../../../utils/constants';
import * as Functions from '../../../utils/functions';

const StreamingInfo = ( props: any ) => {

    const closeModal = () => {
        props.onUpdateShowStreamingInfoModal( false );
    };

    const openURL = ( streamingURL: string ) => {
        if ( props.redirect ) {
            window.location.href = streamingURL;
        } else {
            window.open(streamingURL, '_blank');
        }
    }

    if( props.movies.length === 0 ) {
        return (
            <Redirect to="/" />
        );
    }

    let movieIndex = props.movieIndex;
    let currentMovie = props.movies[ movieIndex ];

    return (
        <ReactModal id="Streaming-Info-Modal" isOpen={ props.isOpen } closeTimeoutMS={ Constants.Global.MODALS_ANIMATION_TIME_IN_MS } ariaHideApp={ false } >
            <div className="Modal-Title-Container">
                <h2>Streaming Info</h2>
            </div>
            <div className="Modal-Content-Container">
                <div className="Modal-Section">
                    <div id="Streaming-Poster-Container">
                    <img alt={ currentMovie.title } className="Streaming-Poster-Image" src={ currentMovie.posterURL } />
                    </div>
                    <div id="Streaming-Details-Container">
                        <table id="Streaming-Table">
                            <thead>
                                <tr><td id="Streaming-Type">{ currentMovie.reactStreaming.type === 'Rent' ? 'For Rent' : 'For Purchase' }</td></tr>
                            </thead>
                            <tbody>
                                <td id="Streaming-Price-Icon" onClick={(  ) => openURL( currentMovie.reactStreaming.URL ) }>
                                    <img alt={ currentMovie.reactStreaming.provider } id="Streaming-Provider-Icon" src={ Functions.getProviderImageURL( currentMovie.reactStreaming.provider ) } />
                                    <span id="Streaming-Divider">/</span>
                                    <span id="Streaming-Price">${ currentMovie.reactStreaming.price }</span>
                                    </td>
                            </tbody>
                        </table>

                        <p id="Price-Guarantee">Sometimes, this lowest price is for standard definition. If you're interested in better definitions, look through the different options in the streaming provider's site.</p>

                    </div>
                </div>
                <hr />
            </div>
            <div className="Modal-Btn-Container">
                <div>
                    <Button classes="Button Modal-Right-Btn Button1" title="Close" clicked={ closeModal }></Button>
                </div>
            </div>
        </ReactModal>
    )
};

function mapStateToProps( state: any ) {
    return {
        movieIndex: state.globalProps.currentMovieIndex,
        movies: state.movieData.movies
    };
}

function mapDispatchToProps( dispatch: any ) {
    return {
        onUpdateShowStreamingInfoModal: ( show: boolean ) => dispatch( Actions.updateShowStreamingInfoModal( show ))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamingInfo);