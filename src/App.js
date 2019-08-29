import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;

    // this is an open subscription: open messaging system between our app and firebase
    // firebase will inform if any authentication stuff is changed
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        
        // onSnapshot will send us the currently persisted data in database
        // we also could use userRef.get() again
        userRef.onSnapshot(snapShot => {
          // we do not get the snapshot data until we call .data()
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          });
          // console.log(this.state);
        });
      }
      
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    // this will close the subscription
    // Calling the unsubscribe function when the component is about to unmount is the best way to make sure we don't get any memory leaks in our application related to listeners still being open even if the component that cares about the listener is no longer on the page.
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  // dispatch() tells redux that the object it receives will be an action obj that will be passed into the reducers
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
// App component only passess the currentUser, not using it therefore connect's first function's first arg is null
export default connect(null, mapDispatchToProps)(App);
