import React from 'react';
import './App.css';
import { Navbar } from './layouts/NavBarAndFooter/Navbar';
import { ExploreTopBooks } from './layouts/HomePage/ExploreTopBooks';

function App() {
  return (
    <>
      <Navbar />
      <ExploreTopBooks />
    </>
  );
}

export default App;
