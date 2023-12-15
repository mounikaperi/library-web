import { ReturnBook } from "./ReturnBook";

export const Carousel1 = () => {
  return (
    <>
      <div className='homepage-carousel-title mt-5 mb-5'>
        <h3>Find your next "I stayed up too late reading" book.</h3>
      </div>
      <div id="carouselExampleControls" className="container container-fluid carousel carousel-dark slide d-none d-lg-block" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="cards-wrapper">
              <ReturnBook />
              <ReturnBook />
              <ReturnBook />
              <ReturnBook />
            </div>
          </div>
          <div className="carousel-item">
            <div className="cards-wrapper">
              <ReturnBook />
              <ReturnBook />
              <ReturnBook />
              <ReturnBook />
            </div>
          </div>
          <div className="carousel-item">
            <div className="cards-wrapper">
              <ReturnBook />
              <ReturnBook />
              <ReturnBook />
              <ReturnBook />
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div >
      <div className='homepage-carousel-title mt-3'>
        <a className='btn btn-outline-secondary btn-lg' href='/search'>View More</a>
      </div>
    </>
  );
}

