import React, { useEffect, useState } from 'react'
import ReviewModel from '../../models/ReviewModel';
import { fetchReviewsForSpecificBook } from '../../services/reviewsService';
import { Spinner } from '../Common/Spinner';
import { Review } from '../Common/Review';
import { Pagination } from '../Common/Pagination';

export const ReviewListPage = () => {

  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalNumberOfReviews, setTotalNumberOfReviews] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  const reviewsPerPage = 5;
  const bookId = (window.location.pathname).split('/')[2];

  useEffect(() => {
    const fetchBookReviews = async () => {
      try {
        const queryStringParameters = `bookId=${bookId}&page=${currentPage-1}&size=${reviewsPerPage}`;
        const fetchedReviews = await fetchReviewsForSpecificBook(queryStringParameters);
        setTotalNumberOfReviews(fetchedReviews.totalReviews);
        setTotalPages(fetchedReviews.totalPages);
        setReviews(fetchedReviews.reviews);
      } catch (error: any) {
        setHttpError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBookReviews();
  }, [currentPage, bookId]);

  if (isLoading) {
    return (<Spinner />);
  }

  if (httpError) {
    return (
      <div className="container mt-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const indexOfLastReview: number = currentPage * reviewsPerPage;
  const indexOfFirstReview: number = indexOfLastReview - reviewsPerPage;
  let lastItem = reviewsPerPage * currentPage <= totalNumberOfReviews ? reviewsPerPage * currentPage : totalNumberOfReviews;
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div className='container mt-5'>
      <div><h3>Comments: ({reviews.length}) </h3></div>
      <p>{indexOfFirstReview + 1} to {lastItem} of {totalNumberOfReviews} items:</p>
      <div className='row'>
        {
          reviews.map((review) => (
            <Review review={review} key={review.id} />
          ))
        }
      </div>
      { totalPages > 1 && 
        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
      }
    </div>
  )
}

export default ReviewListPage
