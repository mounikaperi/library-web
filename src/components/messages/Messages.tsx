import { useOktaAuth } from '@okta/okta-react';
import { useEffect, useState } from 'react';
import { Spinner } from '../Common/Spinner';
import { fetchAllMessagesOfUser } from '../../services/messagesService';
import { Pagination } from '../Common/Pagination';

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

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className='mt-2'>
      {
        messages.length > 0 
        ? 
          <>
            <h5>Current Q/A:</h5>
            {
              messages.map(message => (
                <div className='card mt-2 shadow p-3 bg-body rounded'>
                  <h5>Case #{message.id}: {message.title}</h5>
                  <h6>{message.userEmail}</h6>
                  <p>{message.question}</p>
                  <hr />
                  <div>
                    <h5>Response: </h5>
                    {
                      message.response && message.adminEmail
                      ? 
                        <>
                          <h6>{message.adminEmail} (admin)</h6>
                          <p>{message.response}</p>
                        </>
                      : 
                        <>
                          <p><i>Pending response from administration. Please be patient.</i></p>
                        </>
                    }
                  </div>
                </div>
              ))
            }
          </>
        : 
          <>
            <h5>All questions you submit will be shown here</h5>
          </>
      }
      {
        totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
      }
    </div>
  );
}