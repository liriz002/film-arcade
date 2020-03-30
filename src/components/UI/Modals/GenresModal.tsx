import React from 'react';
import ReactModal from 'react-modal';
import Genre from '../../Genre/Genre';
import Button from '../Button/Button';

import './Modals.css';
import * as Constants from '../../../utils/constants';

const GenresModal = ( props: any ) => {
    return (
        <ReactModal id="Genres-Modal" isOpen={ props.isOpen }>
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

          <Button classes="Button1" title="Any Genres" />
        </ReactModal>
    );
};

export default GenresModal;