import { reviewsServiceUrl } from "../utils/urlConfig"

export const fetchReviewsForSpecificBook = async (queryParameters: string) => {
  const reviewsUrl: string = `${reviewsServiceUrl()}/search/findByBookId?${queryParameters}`;
  const reviewsResponse = await fetch(reviewsUrl);
  if (!reviewsResponse.ok) {
    console.log(`reviewsService.js: fetchReviewsForSpecificBook: calling reviewsUrl: ${reviewsUrl}`);
    throw new Error(`There is an issue fetching reviews for this book. Please try again later!!!`);
  }
  const reviewsResponseJson = await reviewsResponse.json();
  return {
    reviews: reviewsResponseJson._embedded.reviews,
    totalPages: reviewsResponseJson.page.totalPages,
    totalReviews: reviewsResponseJson.page.totalElements,
    numberOfReviewsInEachPage: reviewsResponseJson.page.size,
    currentPage: reviewsResponseJson.page.number
  }; 
}