import { useState, useEffect } from "react";
import BookModel from "../../models/BookModel";
import { fetchBooks } from "../../services/booksService";
import { Spinner } from "../Common/Spinner";
import { SearchSpecificBook } from "./SearchSpecificBook";
import { Pagination } from "../Common/Pagination";
import { BOOK_CATEGORIES } from "../../utils/constants";

export const SearchBooks = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [searchUrl, setSearchUrl] = useState('');
  const [categorySelection, setCategorySelection] = useState('Book Category');
  const booksPerPage = 5;
  useEffect(() => {
    const fetchAllAvailableBooks = async () => {
      try {
        let queryParameters = `page=${currentPage - 1}&size=${booksPerPage}`;
        const fetchedBookResponse = await fetchBooks(queryParameters, searchUrl);
        setBooks(fetchedBookResponse.books);
        setTotalAmountOfBooks(fetchedBookResponse.totalBooks);
        setTotalPages(fetchedBookResponse.totalPages);
      } catch (error: any) {
        setHttpError(error.message);
      } finally {
        setIsLoading(false);
      }
      window.scrollTo(0, 0);
    }
    fetchAllAvailableBooks();
  }, [currentPage, searchUrl]);
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
  const searchHandleChange = () => {
    if (searchText === '') {
      setSearchUrl('');
    } else {
      setSearchUrl(`/search/findByTitleContaining?title=${searchText}&page=${currentPage - 1}&size=${booksPerPage}`);
    }
  };
  const categoryField = (value: string) => {
    if (BOOK_CATEGORIES.includes(value.toLowerCase())) {
      setCategorySelection(value);
      setSearchUrl(`/search/findByCategory?category=${value}&page=${currentPage-1}&size=${booksPerPage}`);
    } else {
      setCategorySelection('All');
      setSearchUrl(`?page=${currentPage-1}&size=${booksPerPage}`);
    }
  };
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
                <input className="form-control me-2" type="search" placeholder="search" aria-labelledby="Search" onChange={e => setSearchText(e.target.value)} />
                <button className="btn btn-outline-success" onClick={() => searchHandleChange()}>Search</button>
              </div>
            </div>
            <div className="col-4">
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
                  data-bs-toggle="dropdown" aria-expanded="false">{categorySelection}</button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li onClick={() => categoryField("All")}><a href="#" className="dropdown-item">All</a></li>
                  <li onClick={() => categoryField("FE")}><a href="#" className="dropdown-item">Frontend</a></li>
                  <li onClick={() => categoryField("BE")}><a href="#" className="dropdown-item">Backend</a></li>
                  <li onClick={() => categoryField("Data")}><a href="#" className="dropdown-item">Data</a></li>
                  <li onClick={() => categoryField("DevOps")}><a href="#" className="dropdown-item">DevOps</a></li>
                </ul>
              </div>
            </div>
          </div>
          {totalAmountOfBooks > 0
            ?
            (<>
              <div className="mt-3">
                <h5>{`Number of Results: ${totalAmountOfBooks}`}</h5>
              </div>
              <p>{`${indexOfFirstBook + 1} to ${lastItem} of ${totalAmountOfBooks} items:`}</p>
              {books.map(book => (
                <SearchSpecificBook book={book} key={book.id} />
              ))}
            </>)
            :
            (<div>
              <h3 className="mt-5">Can't find what you are looking for?</h3>
              <a type="button" className="btn main-color mb-5 btn-md px-4 me-md-2 fw-bold text-white" href="#">Library Services</a>
            </div>)
          }
          {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
        </div>
      </div>
    </div>
  );
}