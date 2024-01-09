import { useOktaAuth } from '@okta/okta-react'
import { useEffect, useState } from 'react';
import HistoryModel from '../../models/HistoryModel';
import { Spinner } from '../Common/Spinner';
import { fetchHistory } from '../../services/historyService';

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
    <div>
      
    </div>
  )
}

export default HistoryPage
