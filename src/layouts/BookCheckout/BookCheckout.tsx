import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { fetchSpecificBook } from "../../services/booksService";
import { StarsReview } from "../Common/StarsReview";
import { CheckoutReviewBox } from "./CheckoutReviewBox";
import ReviewModel from "../../models/ReviewModel";
import { fetchReviewsForSpecificBook } from "../../services/reviewsService";

export const BookCheckout = () => {
  const [book, setBook] = useState<BookModel>();
  const [, setIsLoading] = useState(true);
  const [, setHttpError] = useState(null);

  const [, setReviews] = useState<ReviewModel[]>([]);
  const [, setTotalStars] = useState(0);
  const [, setIsLoadingReview] = useState(true);

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
  }, []);
  useEffect(() => {
    const fetchBookReviews = async () => {
      try {
        const queryStringParameters = `bookId=${bookId}`;
        const fetchedReviews = await fetchReviewsForSpecificBook(queryStringParameters);
        const sumofAllRatings = fetchedReviews.reviews.reduce((acc: any, review: any) => acc + review.rating, 0);
        const averageRatingOfBook = Math.round(sumofAllRatings / fetchedReviews.totalReviews);
        setTotalStars(+averageRatingOfBook);
        setReviews(fetchedReviews.reviews);
        setIsLoadingReview(false);
      } catch (error: any) {
        setIsLoadingReview(false);
        setHttpError(error.message);
      }
    }
    fetchBookReviews();
  }, []);
  return (
    <div className="container d-none d-lg-block">
      <div className="row mt-5">
        <div className="col-sm-2 col-md-2">
          {book?.img
            ? <img src={book?.img} width='226' height="349" alt="Book" />
            : <img src={require('./../../images/books.jpg')} width='226' height='349' alt='Book' />
          }
        </div>
        <div className="col-4 col-md-5 container">
          <div className="ml-2">
            <h2>{book?.title}</h2>
            <h5 className="text-primary">{book?.author}</h5>
            <p className="lead">{book?.description}</p>
            <StarsReview rating={4} size={32}/>
          </div>
        </div>
        <CheckoutReviewBox book={book} mobile={false} />
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
        <CheckoutReviewBox book={book} mobile={true} />
        <hr />
      </div>
    </div>
  );
}