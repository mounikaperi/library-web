import React from 'react';
import './App.css';
import { HomePage } from './layouts/HomePage/HomePage';
import { Navbar } from './layouts/NavBarAndFooter/Navbar';
import { Footer } from './layouts/NavBarAndFooter/Footer';
import { SearchBooks } from './layouts/SearchBooks/SearchBooks';

function App() {
  return (
    <>
      <Navbar />
      {/* <HomePage /> */}
      <SearchBooks />
      <Footer />
    </>
  );
}

export default App;
