import React from 'react';
import './App.css';
import { HomePage } from './components/HomePage/HomePage';
import { Navbar } from './components/NavBarAndFooter/Navbar';
import { Footer } from './components/NavBarAndFooter/Footer';
import { SearchBooks } from './components/SearchBooks/SearchBooks';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { BookCheckout } from './components/BookCheckout/BookCheckout';
import { BookShelf } from './components/ShelfPage/BookShelf';
import { oktaConfig } from './lib/oktaConfig';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';
import ReviewListPage from './components/BookCheckout/ReviewListPage';
import { MessagesPage } from './components/messages/MessagesPage';

const oktaAuth = new OktaAuth(oktaConfig);

function App() {
  const customAuthHandler = () => {
    history.push('/login');
  }
  const history = useHistory();
  const retoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  }
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={retoreOriginalUri} onAuthRequired={customAuthHandler}>
        <Navbar />
        <div className='flex-grow-1'>
          <Switch>
            <Route path="/" exact><Redirect to='/home' /></Route>
            <Route path="/home" exact><HomePage /></Route>
            <Route path="/search"><SearchBooks /></Route>
            <Route path="/reviewList/:bookId"><ReviewListPage /></Route>
            <Route path="/checkout/:bookId"><BookCheckout /></Route>
            <Route path="/login" render={() => <LoginWidget config={oktaConfig} />} ></Route>
            <Route path='/login/callback' component={LoginCallback}></Route>
            <SecureRoute path='/shelf'><BookShelf /></SecureRoute>
            <SecureRoute path='/messages'><MessagesPage /></SecureRoute>
          </Switch>
        </div>
        <Footer />
      </Security>
    </div>
  );
}

export default App;
