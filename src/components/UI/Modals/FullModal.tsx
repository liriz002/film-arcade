import React from 'react';
import ReactModal from 'react-modal';

import Movie from '../../Movie/Movie';

const FullModal = () => {
    return (
        <div>
            <ReactModal id="Full-Modal" isOpen={ true }>
                <Movie />
            </ReactModal>
        </div>
    );
};

export default FullModal;