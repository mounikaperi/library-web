import React from 'react';
import './App.css';
import { HomePage } from './layouts/HomePage/HomePage';
import { Navbar } from './layouts/NavBarAndFooter/Navbar';
import { Footer } from './layouts/NavBarAndFooter/Footer';
import { SearchBooks } from './layouts/SearchBooks/SearchBooks';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { BookCheckout } from './layouts/BookCheckout/BookCheckout';
import { oktaConfig } from './lib/oktaConfig';
import { OktaAuth,toRelativeUrl } from '@okta/okta-auth-js';

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
      <Navbar />
      <div className='flex-grow-1'>
        <Switch>
          <Route path="/" exact>
            <Redirect to='/home' />
          </Route>
          <Route path="/home" exact>
            <HomePage />
          </Route>
          <Route path="/search">
            <SearchBooks />
          </Route>
          <Route path="/checkout/:bookId">
            <BookCheckout />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
