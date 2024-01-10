import { useOktaAuth } from '@okta/okta-react'
import { useEffect, useState } from 'react';
import HistoryModel from '../../models/HistoryModel';
import { Spinner } from '../Common/Spinner';
import { fetchHistory } from '../../services/historyService';
import { Link } from 'react-router-dom';
import { Pagination } from '../Common/Pagination';

export const HistoryPage = () => {

  const { authState } = useOktaAuth();
  const sizePerPage = 5;
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [httpError, setHttpError] = useState(null);

  const [histories, setHistories] = useState<HistoryModel[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchUserHistory = async () => {
      try {
        const historiesResponse = await fetchHistory(authState, currentPage, sizePerPage);
        setHistories(historiesResponse._embedded.histories);
        setTotalPages(historiesResponse.page.totalPages);
      } catch (error: any) {
        setHttpError(error.message);
      } finally {
        setIsLoadingHistory(false);
      }
    }
    fetchUserHistory();
  }, [authState, currentPage]);

  if (isLoadingHistory) {
    return (<Spinner />);
  }

  if (httpError) {
    return (
      <div className='container m-5'>
        <p>{httpError}</p>
      </div>
    );
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className='mt-2'>
      {
        histories.length > 0 ?
          <>
            <h5>Recent History:</h5>
            {
              histories.map((currentHistory) => (
                <div key={currentHistory.id}>
                  <div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
                    <div className='row g-0'>
                      <div className='col-md-2'>
                        <div className='d-none d-lg-block'>
                          {
                            currentHistory.img
                              ? <img src={currentHistory.img} width='123' height='196' alt='Book' />
                              : <img src={require('../../images/LibraryIcon.jpg')} width='123' height='196' alt='Book' />
                          }
                        </div>
                        <div className='d-lg-none d-flex justify-content-center align-items-center'>
                          {
                            currentHistory.img
                            ? <img src={currentHistory.img} width='123' height='196' alt='Book' />
                            : <img src={require('../../images/LibraryIcon.jpg')} width='123' height='196' alt='Book' />
                          }
                        </div>
                      </div>
                      <div className='col'>
                        <div className='card-body'>
                          <h5 className='card-title'>{currentHistory.author}</h5>
                          <h4>{currentHistory.title}</h4>
                          <p className='card-text'>{currentHistory.description}</p>
                          <hr />
                          <p className='card-text'>Checked out on: {currentHistory.checkoutDate}</p>
                          <p className='card-text'>Returned on: {currentHistory.returnedDate}</p>
                        </div>
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
            <h3 className='mt-3'>Currently no history:</h3>
            <Link className='btn btn-primary' to={'search'}>Search for new book</Link>
          </>
      }
      { totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
    </div>
  )
}

export default HistoryPage
