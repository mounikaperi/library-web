import { useOktaAuth } from '@okta/okta-react'
import React, { useEffect, useState } from 'react'
import ShelfCurrentLoans from '../../models/ShelfCurrentLoans';
import { fetchCurrentLoans, renewLoanForSpecificBook, returnBookSpecificToUser } from '../../services/booksService';
import { Spinner } from '../Common/Spinner';
import { Link } from 'react-router-dom';
import { LoansModal } from './LoansModal';

function Loans() {

  const { authState } = useOktaAuth();
  const [httpError, setHttpError] = useState(null);

  const [shelfCurrentLoans, setShelfCurrentLoans] = useState<ShelfCurrentLoans[]>([]);
  const [isLoadingUserLoans, setIsLoadingUserLoans] = useState(true);
  const [checkout, setCheckout] = useState(false);

  useEffect(() => {
    const fetchUserCurrentLoans = async () => {
      try {
        const shelfCurrentLoansResponse = await fetchCurrentLoans(authState);
        setShelfCurrentLoans(shelfCurrentLoansResponse);
      } catch (error: any) {
        setHttpError(error.message);
      } finally {
        setIsLoadingUserLoans(false);
      }
      window.scrollTo(0, 0);
    }
    fetchUserCurrentLoans();
  }, [authState, checkout]);

  if (isLoadingUserLoans) {
    return (
      <Spinner />
    );
  }

  if (httpError) {
    return (
      <div className='container m-5'>
        <p>{httpError}</p>
      </div>
    );
  }

  async function returnBook(bookId: string) {
    await returnBookSpecificToUser(authState, bookId);
    setCheckout(!checkout);
  }

  async function renewLoan(bookId: string) {
    await renewLoanForSpecificBook(authState, bookId);
    setCheckout(!checkout);
  }
  
  return (
    <div>
      { /* Desktop */ }
      <div className='d-none d-lg-block mt-2'>
        { shelfCurrentLoans.length > 0 
        ?
          <>
            <h5>Current Loans:</h5>
            { shelfCurrentLoans.map((shelfCurrentLoan) => (
                <div key={shelfCurrentLoan.book.id}>
                  <div className='row mt-3 mb3'>
                    <div className='col-4 col-md-4 container'>
                      {
                        shelfCurrentLoan.book?.img
                          ? <img src={shelfCurrentLoan.book?.img} width='226' height='349' alt='Book' />
                          : <img src={require('../../images/LibraryIcon.jpg')} width='226' height='226' alt='Book' />
                      }
                    </div>
                    <div className='card col-3 col-md-3 container d-flex'>
                      <div className='card-body'>
                        <div className='mt-3'>
                          <h4>Loan Options</h4>
                          {
                            shelfCurrentLoan.daysLeft > 0 &&
                            <p className='text-secondary'>Due in { shelfCurrentLoan.daysLeft } days</p>
                          }
                          {
                            shelfCurrentLoan.daysLeft === 0 &&
                            <p className='text-success'>Due Today</p>
                          }
                          {
                            shelfCurrentLoan.daysLeft < 0 && 
                            <p className='text-danger'>Past due by {shelfCurrentLoan.daysLeft} days.</p>
                          }
                          <div className='list-group mt-3'>
                            <button className='list-group-item list-group-action' aria-current='true'
                            data-bs-toggle='modal' data-bs-target={`#modal${shelfCurrentLoan.book.id}`}>
                              Manage Loan
                            </button>
                            <Link to={'search'} className='list-group-item list-group-item-action'>
                              Search more books?
                            </Link>
                          </div>
                        </div>
                        <hr />
                        <p className='mt-3'>
                          Help Others find their adventure by reviewing your loan.
                        </p>d
                        <Link className='btn btn-primary' to={`checkout/${shelfCurrentLoan.book.id}`}>Leave a Review</Link>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <LoansModal shelfCurrentLoan={shelfCurrentLoan} mobile={false} returnBook={returnBook} renewLoan={renewLoan}/>
                </div>
              ))
            }
          </>
        : 
          <>
            <h3 className='mt-3'>Currently no loans</h3>
            <Link className='btn btn-primary' to={`search`}>Search for a new book</Link>
          </>
        }
      </div>
      { /* Mobile */ }
      <div className='container d-lg-none mt-2'>
        { shelfCurrentLoans.length > 0 
        ?
          <>
            <h5 className='mb-3'>Current Loans:</h5>
            { shelfCurrentLoans.map((shelfCurrentLoan) => (
                <div key={shelfCurrentLoan.book.id}>
                    <div className='d-flex justify-content-center align-items-center'>
                      {
                        shelfCurrentLoan.book?.img
                          ? <img src={shelfCurrentLoan.book?.img} width='226' height='349' alt='Book' />
                          : <img src={require('../../images/LibraryIcon.jpg')} width='226' height='226' alt='Book' />
                      }
                    </div>
                    <div className='card d-flex mt-5 mb-3'>
                      <div className='card-body container'>
                        <div className='mt-3'>
                          <h4>Loan Options</h4>
                          {
                            shelfCurrentLoan.daysLeft > 0 &&
                            <p className='text-secondary'>Due in { shelfCurrentLoan.daysLeft } days</p>
                          }
                          {
                            shelfCurrentLoan.daysLeft === 0 &&
                            <p className='text-success'>Due Today</p>
                          }
                          {
                            shelfCurrentLoan.daysLeft < 0 && 
                            <p className='text-danger'>Past due by {shelfCurrentLoan.daysLeft} days.</p>
                          }
                          <div className='list-group mt-3'>
                            <button className='list-group-item list-group-action' aria-current='true'
                            data-bs-toggle='modal' data-bs-target={`#mobilemodal${shelfCurrentLoan.book.id}`}>
                              Manage Loan
                            </button>
                            <Link to={'search'} className='list-group-item list-group-item-action'>
                              Search more books?
                            </Link>
                          </div>
                        </div>
                        <hr />
                        <p className='mt-3'>
                          Help Others find their adventure by reviewing your loan.
                        </p>
                        <Link className='btn btn-primary' to={`checkout/${shelfCurrentLoan.book.id}`}>Leave a Review</Link>
                      </div>
                    </div>
                  <hr />
                  <LoansModal shelfCurrentLoan={shelfCurrentLoan} mobile={true} returnBook={returnBook} renewLoan={renewLoan}/>
                </div>
              ))
            }
          </>
        : 
          <>
            <h3 className='mt-3'>Currently no loans</h3>
            <Link className='btn btn-primary' to={`search`}>Search for a new book</Link>
          </>
        }
      </div>
    </div>
  )
}

export default Loans
