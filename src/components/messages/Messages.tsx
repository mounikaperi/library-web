import { useOktaAuth } from '@okta/okta-react';
import { useEffect, useState } from 'react';
import { Spinner } from '../Common/Spinner';
import { fetchAllMessagesOfUser } from '../../services/messagesService';

export const Messages = () => {

  const { authState } = useOktaAuth();
  const [ isLoadingMessages, setIsLoadingMessages ] = useState(true);
  const [ httpError, setHttpError ] = useState(null);

  const [ messages, setMessages ] = useState<MessageModel[]>([]);

  const [ messagesPerPage ] = useState(5);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ totalPages, setTotalPages ] = useState(0);

  useEffect(() => {
    const fetchUserMessages = async () => {
      try {
        const allMessagesOfUser = await fetchAllMessagesOfUser(authState, currentPage, messagesPerPage);
        setMessages(allMessagesOfUser._embedded.messages);
        setTotalPages(allMessagesOfUser.page.totalPages);
      } catch (error: any) {
        setHttpError(error.message);
      } finally {
        setIsLoadingMessages(false);
      }
    }
    fetchUserMessages();
    window.scrollTo(0, 0);
  }, [authState, currentPage]);

  if (isLoadingMessages) {
    return <Spinner />
  }

  if (httpError) {
    return (
      <div className='container mt-3'>
        <p>{httpError}</p>
      </div>
    )
  }

  const paginate = ({ pageNumber: number }) => setCurrentPage(pageNumber);
  return ();
}