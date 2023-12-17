import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { fetchSpecificBook } from "../../services/booksService";
import { StarsReview } from "../Common/StarsReview";

export const BookCheckout = () => {
  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const bookId = (window.location.pathname).split('/')[2];
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const loadedBook: BookModel = await fetchSpecificBook(bookId);
        setBook(loadedBook);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        setHttpError(error.message);
      }
    }
    fetchBook();
  })
  return (
    <div className="container d-none d-lg-block">
      <div className="row mt-5">
        <div className="col-sm-2 col-md-2">
          {book?.img
            ? <img src={book?.img} width='226' height="349" alt="Book" />
            : <img src={require('./../../images/books.jpg')} width='226' height='349' alt='Book' />
          }
        </div>
        <div className="col-4 col-md-4 container">
          <div className="ml-2">
            <h2>{book?.title}</h2>
            <h5 className="text-primary">{book?.author}</h5>
            <p className="lead">{book?.description}</p>
          </div>
        </div>
      </div>
      <div className="container d-lg-none mt-5">
        <div className="d-flex justify-content-center align-items-center">
          {book?.img
            ? <img src={book?.img} width='226' height="349" alt="Book" />
            : <img src={require('./../../images/books.jpg')} width='226' height='349' alt='Book' />
          }
        </div>
        <div className="mt-4">
          <div className="ml-2">
            <h2>{book?.title}</h2>
            <h5 className="text-primary">{book?.author}</h5>
            <p className="lead">{book?.description}</p>
            <StarsReview rating={4} size={32}/>
          </div>
        </div>
      </div>
    </div>
  );
}