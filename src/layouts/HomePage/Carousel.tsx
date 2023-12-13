export const Carousel = () => {
  return (
    <div className="container mt-5" style={{height: 550}}>
      <div className="homepage-carousel-title">
        <h3>Find your next "I am slayed up too late reading</h3>
      </div>
      <div id="carouselExampleControls" className="carousel carousel-dark slide mt-5 d-none d-lg-block" data-bs-interval="false">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
                <div className="text-center">
                  <img src={require('./../../images/books.jpg')} alt="book" width="151" height="233"/>
                  <h6 className="mt-2">bookTitle</h6>
                  <p>bookName</p>
                  <a className="btn main-color text-white" href="#">Reserve</a>
                </div>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" 
            data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
              <span className="crousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" 
            data-bs-target='#carouselExampleControls' data-bs-slide='next'>
              <span className="crousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div>
          
        </div>
      </div>
    </div>
  )
}