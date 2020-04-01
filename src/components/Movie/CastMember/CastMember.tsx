import React from 'react';
import './CastMember.css';

const CastMember = ( props: any ) => {
    return (
        <span className="Cast-Member">
            <img id="Cast-Member-Image" src={ props.imageURL } />
            <p id="Cast-Member-Name">{ props.name }</p>
        </span>
    );
};

export default CastMember;