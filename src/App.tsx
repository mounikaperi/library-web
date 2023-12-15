import React from 'react';
import './App.css';
import { HomePage } from './layouts/HomePage/HomePage';
import { Navbar } from './layouts/NavBarAndFooter/Navbar';
import { Footer } from './layouts/NavBarAndFooter/Footer';

function App() {
  return (
    <>
      <Navbar />
      <HomePage />
      <Footer />
    </>
  );
}

export default App;
