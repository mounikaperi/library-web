import AddBookRequest from "../models/AddBookRequest";
import { adminServiceUrl } from "../utils/urlConfig"

export const addNewBookByAdmin = async (authState: any, bookParameters: AddBookRequest ) => {
  const { title, author, description, copies, category, img } = bookParameters;
  const url = `${adminServiceUrl()}/secure/add/book`;
  if (authState?.isAuthenticated && title.trim() !== '' && author.trim() !== '' && category !== 'Category'
    && description !== '' && copies >= 0 && img?.trim() !== '') {
      const book: AddBookRequest = new AddBookRequest(title, author, description, copies, category, img || '');
      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
      };
      const submitNewBookResponse = await fetch(url, requestOptions);
      if (!submitNewBookResponse.ok) {
        throw new Error('Something went wrong!!!');
      }
  }
}