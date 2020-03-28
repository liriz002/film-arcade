import React from 'react';
import * as Functions from '../../utils/functions';
// import image from '../../images/Genres/Science Fiction - Mono.png';

const genre = ( props ) => {
    return (
        <div>
            { props.name }
            <img src={ Functions.getGenreImageURL( 'Science Fiction', true )} />
        </div>
    );
}

export default genre;