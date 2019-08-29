import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth } from '../../firebase/firebase.utils';

// special syntax
import { ReactComponent as Logo } from '../../assets/crown.svg';
import './header.styles.scss';

const Header = ({currentUser}) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'> SHOP </Link>
            <Link className='option' to='/shop'> CONTACT </Link>
            {
                currentUser ?
                <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div> 
                :
                <Link className='option' to='/signIn'>SIGN IN</Link>
            }
        </div>
    </div>
);

// function that allows us to access the state
// this state in function param is the top-level root reducer
const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

// connect is a higher order component
export default connect(mapStateToProps)(Header);