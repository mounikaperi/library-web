import React from 'react';
import { ReturnBook } from "./ReturnBook";

export const Carousel = () => {
  return (
    <>
      <div className='homepage-carousel-title mt-5 mb-5'>
        <h3>Find your next "I stayed up too late reading" book.</h3>
      </div>
      <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="cards-wrapper">
              <ReturnBook />
              <div className="card d-none d-md-block">
                <ReturnBook />
              </div>
            </div>
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
      <div className='homepage-carousel-title mt-3 mb-6'>
        <a className='btn btn-outline-secondary' href='/search'>View More</a>
      </div>
    </>
  );
}
