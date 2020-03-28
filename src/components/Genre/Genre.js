import React, { useState } from 'react';
import { useSpring, animated as a } from 'react-spring';

import * as Functions from '../../utils/functions';
import * as Constants from '../../utils/constants';
import styles from './Genre.css';

const Genre = ( props ) => {
    const [ isSelected, set ] = useState( props.isSelected );
    const toggleSelected = () => {
        set( state => !state );
    };

    return (
        <span className={ "Card " + ( isSelected ? "Selected-Card" : "Unselected-Card" )} onClick={ toggleSelected }>
             <img className="Genre-Image " src={ Functions.getGenreImageURL( props.name, isSelected ) } />
             <div className="Genre-Label">{ props.name === "Science Fiction" ? "Sci-Fi" : props.name }</div>
        </span>
    );
}

export default Genre;

/*
<ReactCardFlip isFlipped={ isSelected } flipDirection="horizontal">
<div>
<img onClick={ () => set( state => !state ) } class="Genre-Image Unselected-Card" src={ Functions.getGenreImageURL( props.name, false ) } />
<span>{ props.name }</span>
</div>

<div>
<img onClick={ () => set( state => !state ) } class="Genre-Image Selected-Card" src={ Functions.getGenreImageURL( props.name, true ) } />
<span>{ props.name }</span>
</div>
</ReactCardFlip>
*/

/*

    /*
    const { transform, opacity } = useSpring( {
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 }
    } );
    const unSelectedStyle = { opacity, transform: transform.interpolate(t => `${t} rotateY(180deg)`) };
    const selectedStyle = { opacity: opacity.interpolate(o => 1 - o), transform };
    

            <div onClick={() => set(state => !state)}>

            <a.div class="Genre-Card Unselected-Card" style={ props.isSelected ? unSelectedStyle : selectedStyle }>
                <img class="Genre-Image" src={ Functions.getGenreImageURL( props.name, false ) } />
            </a.div>
            <a.div class="Genre-Card Selected-Card" style={ props.isSelected ? selectedStyle : unSelectedStyle }>
                <img class="Genre-Image" src={ Functions.getGenreImageURL( props.name, true ) } />
            </a.div>
            </div>

*/


/*

            { props.name }
            <img src={ Functions.getGenreImageURL( 'Science Fiction', true )} />

*/