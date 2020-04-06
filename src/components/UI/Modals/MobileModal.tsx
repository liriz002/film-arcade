import React from 'react';
import ReactModal from 'react-modal';
import * as Constants from '../../../utils/constants';

const MobileModal = ( props: any ) => {
    return (
        <ReactModal id="Mobile-Modal" isOpen={ props.isOpen } closeTimeoutMS={ Constants.Global.MODALS_ANIMATION_TIME_IN_MS }>
            <div className="Modal-Title-Container">
                <h2>You Shall Not Pass</h2>
            </div>
            <div className="Modal-Content-Container">
                <div className="Modal-Section">
                    <p>We both know watching movies on a phone is basically an unforgivable sin. You know better.</p>
                    <p>Visit this page again from a bigger device, like a laptop.</p>
                    <p>Hasta la vista, baby.</p>
                </div>
            </div>
        </ReactModal>
    )
};

export default MobileModal;