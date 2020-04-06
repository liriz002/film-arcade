import React from 'react';
import ReactModal from 'react-modal';
import Button from '../Button/Button';
import { connect } from 'react-redux';

import * as Actions from '../../../store/actions/actions';
import * as Constants from '../../../utils/constants';

const StreamingInfo = ( props: any ) => {

    const closeModal = () => {
        props.onUpdateShowStreamingInfoModal( false );
    };

    const openURL = () => {
        window.open("https://www.vudu.com/content/movies/details/Uncut-Gems/1304658", '_blank');
    }

    return (
        <ReactModal id="Streaming-Info-Modal" isOpen={ props.isOpen } closeTimeoutMS={ Constants.Global.MODALS_ANIMATION_TIME_IN_MS } >
            <div className="Modal-Title-Container">
                <h2>Streaming Info</h2>
            </div>
            <div className="Modal-Content-Container">
                <div className="Modal-Section">
                    <div id="Streaming-Poster-Container">
                    <img className="Streaming-Poster-Image" src="https://image.tmdb.org/t/p/w780/AuGiPiGMYMkSosOJ3BQjDEAiwtO.jpg" />
                    </div>
                    <div id="Streaming-Details-Container">
                        <table id="Streaming-Table">
                            <thead>
                                <tr><td id="Streaming-Type">For Rent</td></tr>
                            </thead>
                            <tbody>
                                <td id="Streaming-Price-Icon" onClick={ openURL }>
                                    <img id="Streaming-Provider-Icon" src="https://images.justwatch.com/icon/146383632/s100" />
                                    <span id="Streaming-Divider">/</span>
                                    <span id="Streaming-Price">$4.99</span>
                                    </td>
                            </tbody>
                        </table>

                        <p id="Price-Guarantee">* This is the lowest price on the Internet to stream 1917.</p>

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

    };
}

function mapDispatchToProps( dispatch: any ) {
    return {
        onUpdateShowStreamingInfoModal: ( show: boolean ) => dispatch( Actions.updateShowStreamingInfoModal( show ))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamingInfo);