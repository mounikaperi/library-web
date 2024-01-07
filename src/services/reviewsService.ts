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

export const fetchUserReviewsForSpecificBook = async (authState: any, bookId: string) => {
  if (authState?.isAuthenticated) {
    const url = `${reviewsServiceUrl}/secure/user/book?bookId=${bookId}`;
    const requestOptions = {
      method:  'GET',
      headers: {
        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
        'Content-Type': 'application/json'
      }
    };
    const userReview = await fetch(url, requestOptions);
    if (!userReview.ok) {
      throw new Error('Something went wrong');
    }
    return await userReview.json();
  }
}

export const submitReviewForSpecificBook = async (authState: any, inputModel: any) => {
  const url = `${reviewsServiceUrl}/secure`;
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authState.accessToken?.accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inputModel)
  };
  const reponseAfterSubmitingReview = await fetch(url, requestOptions);
  if (!reponseAfterSubmitingReview.ok) {
    throw new Error('Something Went Wrong!!');
  }
  return reponseAfterSubmitingReview;
}