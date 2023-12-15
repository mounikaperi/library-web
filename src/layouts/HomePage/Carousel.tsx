import { ReturnBook } from "./ReturnBook";
import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { fetchBooks } from "../../services/booksService";

export const Carousel = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  useEffect(() => {
    fetchAllAvailableBooks();
  }, []);
  const fetchAllAvailableBooks = async () => {
    try {
      const fetchedBooks = await fetchBooks();
      setBooks(fetchedBooks);
    } catch (error: any) {
      setHttpError(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className='container mt-5' style={{ height: 550 }}>
      <div className='homepage-carousel-title'>
        <h3>Find your next "I stayed up too late reading" book.</h3>
      </div>
      <div id='carouselExampleControls' className='carousel carousel-light slide mt-5 
                d-none d-lg-block' data-bs-interval='false'>

        {/* Desktop */}
        <div className='carousel-inner'>
          <div className='carousel-item active'>
            <div className='row d-flex justify-content-center align-items-center'>
              <ReturnBook />
              <ReturnBook />
              <ReturnBook />
              <ReturnBook />
            </div>
          </div>
          <div className='carousel-item'>
            <div className='row d-flex justify-content-center align-items-center'>
              <ReturnBook />
              <ReturnBook />
              <ReturnBook />
              <ReturnBook />
            </div>
          </div>
          <div className='carousel-item'>
            <div className='row d-flex justify-content-center align-items-center'>
              <ReturnBook />
              <ReturnBook />
              <ReturnBook />
              <ReturnBook />
            </div>
          </div>
        </div>
        <button className='carousel-control-prev' type='button'
          data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
          <span className='carousel-control-prev-icon' aria-hidden='true'></span>
          <span className='visually-hidden'>Previous</span>
        </button>
        <button className='carousel-control-next' type='button'
          data-bs-target='#carouselExampleControls' data-bs-slide='next'>
          <span className='carousel-control-next-icon' aria-hidden='true'></span>
          <span className='visually-hidden'>Next</span>
        </button>
      </div>

      {/* Mobile */}
      <div className='d-lg-none mt-3'>
        <div className='row d-flex justify-content-center align-items-center'>
          <ReturnBook />
        </div>
      </div>
      <div className='homepage-carousel-title mt-3'>
        <a className='btn btn-outline-secondary btn-lg' href='/search'>View More</a>
      </div>
    </div>
  );
}