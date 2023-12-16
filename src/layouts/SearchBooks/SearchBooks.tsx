import { useState, useEffect } from "react";
import BookModel from "../../models/BookModel";
import { fetchBooks } from "../../services/booksService";
import { Spinner } from "../Common/Spinner";
import { SearchSpecificBook } from "./SearchSpecificBook";

export const SearchBooks = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  useEffect(() => {
    fetchAllAvailableBooks();
  }, []);
  const fetchAllAvailableBooks = async () => {
    try {
      const queryParameters = 'page=0&size=5';
      const fetchedBooks = await fetchBooks(queryParameters);
      setBooks(fetchedBooks);
    } catch (error: any) {
      setHttpError(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  if (isLoading) {
    return (
      <Spinner />
    );
  }
  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }
  return (
    <div>
      <div className="container">
        <div>
          <div className="row mt-5">
            <div className="col-6">
              <div className="d-flex">
                <input className="form-control me-2" type="search" placeholder="search" aria-labelledby="Search" />
                <button className="btn btn-outline-success">Search</button>
              </div>
            </div>
            <div className="col-4">
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" 
                data-bs-toggle="dropdown" aria-expanded="false">Category</button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><a href="#" className="dropdown-item">All</a></li>
                  <li><a href="#" className="dropdown-item">Frontend</a></li>
                  <li><a href="#" className="dropdown-item">Backend</a></li>
                  <li><a href="#" className="dropdown-item">DevOps</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <h5>Number of Results: {22}</h5>
          </div>
          <p>1 to 5 of 22 items:</p>
          {books.map(book => (
            <SearchSpecificBook book={book} key={book.id} />
          ))}
        </div>
      </div>
    </div>
  );
}