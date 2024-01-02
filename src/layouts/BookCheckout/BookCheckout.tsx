import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { fetchCurrentLoansCount, fetchSpecificBook } from "../../services/booksService";
import { StarsReview } from "../Common/StarsReview";
import { CheckoutReviewBox } from "./CheckoutReviewBox";
import ReviewModel from "../../models/ReviewModel";
import { fetchReviewsForSpecificBook } from "../../services/reviewsService";
import { Spinner } from "../Common/Spinner";
import { LatestReviews } from "./LatestReviews";
import { useOktaAuth } from "@okta/okta-react";

export const BookCheckout = () => {

  const { authState } = useOktaAuth();

  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [, setHttpError] = useState(null);

  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);

  const [currentLoansCount, setCurrentLoansCount] = useState(0);
  const [isLoadingCurrentLoansCount, setIsLoadingCurrentLoansCount] = useState(false);

  const bookId = (window.location.pathname).split('/')[2];

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const loadedBook: BookModel = await fetchSpecificBook(bookId);
        setBook(loadedBook);
      } catch (error: any) {
        setHttpError(error.message);
      } finally {
        setIsLoading(false);
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
      } catch (error: any) {
        setHttpError(error.message);
      } finally {
        setIsLoadingReview(false);
      }
    }
    fetchBookReviews();
  }, []);
  useEffect(() => {
    const fetchUserCurrentLoansCount = async () => {
      try {
        await fetchCurrentLoansCount(authState);
      } catch (error: any) {
        setHttpError(error.message);
      } finally {
        setIsLoadingCurrentLoansCount(false);
      }
    };
    fetchUserCurrentLoansCount();
  }, [authState]);

  if (isLoading || isLoadingReview || isLoadingCurrentLoansCount) {
    return (<Spinner />);
  }
  return (
    <div>
      <div className='container d-none d-lg-block'>
        <div className='row mt-5'>
          <div className='col-sm-2 col-md-2'>
            {book?.img ?
              <img src={book?.img} width='226' height='349' alt='Book' />
              :
              <img src={require('./../../images/books3.jpg')} width='226'
                height='349' alt='Book' />
            }
          </div>
          <div className='col-4 col-md-4 container'>
            <div className='ml-2'>
              <h2>{book?.title}</h2>
              <h5 className='text-primary'>{book?.author}</h5>
              <p className='lead'>{book?.description}</p>
              <StarsReview rating={totalStars} size={32} />
            </div>
          </div>
          <CheckoutReviewBox book={book} mobile={false} />
        </div>
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={false} />
      </div>
      <div className='container d-lg-none mt-5'>
        <div className='d-flex justify-content-center alighn-items-center'>
          {book?.img ?
            <img src={book?.img} width='226' height='349' alt='Book' />
            :
            <img src={require('./../../images/books3.jpg')} width='226'
              height='349' alt='Book' />
          }
        </div>
        <div className='mt-4'>
          <div className='ml-2'>
            <h2>{book?.title}</h2>
            <h5 className='text-primary'>{book?.author}</h5>
            <p className='lead'>{book?.description}</p>
            <StarsReview rating={totalStars} size={32} />
          </div>
        </div>
        <CheckoutReviewBox book={book} mobile={true} />
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={true} />
      </div>
    </div>
  );
}