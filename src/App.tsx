import React from 'react';
import './App.css';
import { HomePage } from './layouts/HomePage/HomePage';
import { Navbar } from './layouts/NavBarAndFooter/Navbar';
import { Footer } from './layouts/NavBarAndFooter/Footer';
import { SearchBooks } from './layouts/SearchBooks/SearchBooks';
import { Redirect, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
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
      </Switch>
      <Footer />
    </>
  );
}

export default App;
