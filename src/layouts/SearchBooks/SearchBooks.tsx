import { useState, useEffect } from "react";
import BookModel from "../../models/BookModel";
import { fetchBooks } from "../../services/booksService";
import { Spinner } from "../Common/Spinner";
import { SearchSpecificBook } from "./SearchSpecificBook";
import { Pagination } from "../Common/Pagination";

export const SearchBooks = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchAllAvailableBooks();
  }, []);
  const fetchAllAvailableBooks = async () => {
    try {
      const queryParameters = `page=${currentPage - 1}&size=${booksPerPage}`;
      const fetchedBookResponse = await fetchBooks(queryParameters);
      setBooks(fetchedBookResponse.books);
      setTotalAmountOfBooks(fetchedBookResponse.totalBooks);
      setTotalPages(fetchedBookResponse.totalPages);
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
  const indexOfLastBook: number = currentPage * booksPerPage;
  const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
  let lastItem = booksPerPage * currentPage <= totalAmountOfBooks ? booksPerPage * currentPage : totalAmountOfBooks;
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
          {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
        </div>
      </div>
    </div>
  );
}