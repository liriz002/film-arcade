import React from 'react';

import './Button.css';

const Button = ( props ) => {
    return (
    <button className={ props.classes } onClick={ props.clicked }>{ props.title } </button>
    );
};

export default Button;