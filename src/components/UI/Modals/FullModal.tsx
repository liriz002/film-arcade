import React from 'react';
import ReactModal from 'react-modal';

import Movie from '../../Movie/Movie';

const FullModal = ( props: any ) => {
    return (
        <div>
            <ReactModal id="Full-Modal" isOpen={ props.isOpen } closeTimeoutMS={ 500 }>
                <Movie />
            </ReactModal>
        </div>
    );
};

export default FullModal;