import React from 'react';

import './custom-button.styles.scss';

// children is a special property in React that gets passed into our components props as the key children
const CustomButton = ({ children, isGoogleSignIn, ...otherProps}) => (
    <button className={`${isGoogleSignIn ? 'google-sign-in' : '' } custom-button` } {...otherProps}>
    {children}
    </button>
)

export default CustomButton;