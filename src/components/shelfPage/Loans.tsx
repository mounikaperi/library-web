import { useOktaAuth } from '@okta/okta-react'
import React, { useEffect, useState } from 'react'
import ShelfCurrentLoans from '../../models/ShelfCurrentLoans';
import { fetchCurrentLoans } from '../../services/booksService';
import { Spinner } from '../Common/Spinner';
import { Link } from 'react-router-dom';

function Loans() {

  const { authState } = useOktaAuth();
  const [httpError, setHttpError] = useState(null);

  const [shelfCurrentLoans, setShelfCurrentLoans] = useState<ShelfCurrentLoans[]>([]);
  const [isLoadingUserLoans, setIsLoadingUserLoans] = useState(true);

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
  }, [authState]);

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
                            data-bs-toggle='modal' data-bs-target={`modal${shelfCurrentLoan.book.id}`}>
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
                  </div>
                  <hr />
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
    </div>
  )
}

export default Loans
