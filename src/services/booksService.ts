import { booksServiceUrl } from "../utils/urlConfig";

export const fetchBooks = async (queryParameters: string) => {
  const booksUrl: string = `${booksServiceUrl()}?${queryParameters}`;
  const booksResponse = await fetch(booksUrl);
  if (!booksResponse) {
    console.log(`booksService.js: fetchBooks: calling booksServiceUrl: ${booksUrl}, response: ${booksResponse}`);
    throw new Error(`No Books Found`);
  }
  const booksResponseJson = await booksResponse.json();
  return booksResponseJson._embedded.books;
}