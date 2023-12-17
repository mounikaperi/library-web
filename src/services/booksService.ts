import { booksServiceUrl } from "../utils/urlConfig";

export const fetchBooks = async (queryParameters: string, searchUrl: string) => {
  let booksUrl: string = `${booksServiceUrl()}?${queryParameters}`;
  if (searchUrl !== '') {
    booksUrl = `${booksServiceUrl()}${searchUrl}`;
  }
  const booksResponse = await fetch(booksUrl);
  if (!booksResponse) {
    console.log(`booksService.js: fetchBooks: calling booksServiceUrl: ${booksUrl}, response: ${booksResponse}`);
    throw new Error(`No Books Found`);
  }
  const booksResponseJson = await booksResponse.json();
  return {
    books: booksResponseJson._embedded.books,
    totalPages: booksResponseJson.page.totalPages,
    totalBooks: booksResponseJson.page.totalElements,
    numberOfBooksInEachPage: booksResponseJson.page.size,
    currentPage: booksResponseJson.page.number
  };
}

export const fetchSpecificBook = async (bookId: string) => {
  let bookServiceUrl: string = `${booksServiceUrl()}/${bookId}`;
  const booksResponse = await fetch(bookServiceUrl);
  if (!booksResponse) {
    console.log(`booksService.js: fetchBooks: calling booksServiceUrl: ${bookServiceUrl}, response: ${booksResponse}`);
    throw new Error(`No Books Found`);
  }
  return booksResponse.json();
}