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

export const fetchCurrentLoansCount = async (authState: any) => {
  if (authState?.isAuthenticated) {
    const url = `${booksServiceUrl}/secure/currentloans/count`;
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
        'Content-Type': 'application/json'
      }
    };
    const currentLoansCountResponse = await fetch(url, requestOptions);
    if (!currentLoansCountResponse.ok) {
      throw new Error('Something went wrong');
    }
    return await currentLoansCountResponse.json();
  }
}

export const fetchCheckedOutBook = async (authState: any, bookId: string) => {
  if (authState?.isAuthenticated) {
    const url = `${booksServiceUrl}/secure/ischeckedout/byuser/?bookId=${bookId}`;
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
        'Content-type': 'application/json'
      }
    };
    const bookCheckedOut = await fetch(url, requestOptions);
    if (!bookCheckedOut.ok) {
      throw new Error('Something went wrong!!!');
    }
    return await bookCheckedOut.json();
  }
}

export const checkIfBookCheckedOut = async (authState: any, bookId: string) => {
  const url=`${booksServiceUrl}/secure/checkout/bookId=${bookId}`;
  const requestOptions = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
      'Content-Type': 'application/json'
    }
  };
  const checkoutResponse = await fetch(url, requestOptions);
  if (!checkoutResponse.ok) {
    throw new Error('Something went wrong');
  }
  return true;
}

export const fetchCurrentLoans = async (authState: any) => {
  if (authState?.isAuthenticated) {
    const url = `${booksServiceUrl}/secure/currentloans`;
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
        'Content-Type': 'application/json'
      }
    };
    const shelfCurrentLoansResponse = await fetch(url, requestOptions);
    if (!shelfCurrentLoansResponse.ok) {
      throw new Error('Something went wrong!!');
    }
    return await shelfCurrentLoansResponse.json();
  }
}