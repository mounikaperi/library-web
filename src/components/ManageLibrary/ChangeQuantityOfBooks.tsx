import { useEffect, useState } from "react"
import BookModel from "../../models/BookModel"
import { fetchBooks } from "../../services/booksService";
import { Spinner } from "../Common/Spinner";
import { Pagination } from "../Common/Pagination";
import { ChangeQuantityOfSpecificBook } from "./ChangeQuantityOfSpecificBook";

export const ChangeQuantityOfBooks = () => {

  const [ books, setBooks ] = useState<BookModel[]>([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ httpError, setHttpError ] = useState(null);
  const [ currentPage, setCurrentPage ] = useState(1);
  const booksPerPage = 5;
  const [ totalAmountOfBooks, setTotalAmountOfBooks ] = useState(0);
  const [ totalPages, setTotalPages ] = useState(0);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        let queryParameters = `page=${currentPage - 1}&size=${booksPerPage}`;
        const fetchedBookResponse = await fetchBooks(queryParameters, '');
        setBooks(fetchedBookResponse.books);
        setTotalAmountOfBooks(fetchedBookResponse.totalBooks);
        setTotalPages(fetchedBookResponse.totalPages);
      } catch (error: any) {
        setHttpError(error.message);
      } finally {
        setIsLoading(false);
      }
      fetchAllBooks();
    }
  }, [currentPage]);


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
    <div className="container mt-5">
      {
        totalAmountOfBooks > 0 
        ?
          <>
            <div className="mt-3">
              <h3>Number of results: ({ totalAmountOfBooks })</h3>
            </div>
            <p>
              { indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks} items:
            </p>
            {
              books.map(book => ( <ChangeQuantityOfSpecificBook book={book} key={book.id} />))
            }
          </>
        :
          <h5>Add a book before changing quantitu</h5>
      }
      { totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} /> } 
    </div>
  );
}