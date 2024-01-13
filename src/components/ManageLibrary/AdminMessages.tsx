import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import { Spinner } from "../Common/Spinner";
import { fetchAdminMessages, submitResponseToQuestionPostedByUser } from "../../services/messagesService";
import { Pagination } from "../Common/Pagination";
import { AdminMessage } from "./AdminMessage";

export const AdminMessages = () => {

  const { authState } = useOktaAuth();

  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [messages, setMessages] = useState<MessageModel[]>([]);
  const messagesPerPage = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [ isResponseSent, setIsResponseSent ] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const adminMessages = await fetchAdminMessages(authState, currentPage, messagesPerPage);
        setMessages(adminMessages._embedded.messages);
        setTotalPages(adminMessages.page.totalPages);
      } catch (error: any) {
        setHttpError(error.message);
      } finally {
        setIsLoadingMessages(false);
      }
    }
    fetchMessages();
    window.scrollTo(0, 0);
  }, [authState, currentPage, isResponseSent]);

  if (isLoadingMessages) {
    return (<Spinner />)
  }

  if (httpError) {
    return (
      <div className="container mt-3">
        <p>{httpError}</p>
      </div>
    )
  }

  async function submitResponseToQuestion (id: number, response:string) {
    await submitResponseToQuestionPostedByUser(authState, id, response);
    setIsResponseSent(!isResponseSent)
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="mt-3">
      {
        messages.length > 0
          ?
          <>
            <h5>Pending 0/4:</h5>
            {
              messages.map((message, id) => (
                <AdminMessage message={message} key={message.id} submitResponseToQuestion={submitResponseToQuestion}/>
              ))
            }
          </>
          :
          <h5>No Pending Q/A</h5>
      }
      {
        totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
      }
    </div>
  );
}