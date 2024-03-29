import AdminMessageRequest from "../models/AdminMessageRequest";
import { messagesServiceUrl } from "../utils/urlConfig"

export const submitNewQuestion = async (authState: any, title:string, question:string) => {
  const url = `${messagesServiceUrl()}/secure/add/message`;
  if (authState?.isAuthenticated && title.trim() !== '' && question.trim() !== '') {
    const messageRequestModel: MessageModel = new MessageModel(title, question);
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messageRequestModel)
    };
    const submitNewQuestionResponse = await fetch(url, requestOptions);
    if(!submitNewQuestionResponse.ok) {
      throw new Error('Something went wrong');
    }
    return submitNewQuestionResponse;
  }
}

export const fetchAllMessagesOfUser = async (authState: any, currentPage: number, messagesPerPage: number) => {
  if (authState?.isAuthenticated) {
    const url = `${messagesServiceUrl()}/search/findByUserEmail?userEmail=${authState?.accessToken?.claims.sub}&page=${currentPage-1}&size=${messagesPerPage}`;
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        'Content-Type': 'application/json'
      }
    };
    const messagesResponse = await fetch(url, requestOptions);
    if (!messagesResponse.ok) {
      throw new Error('Something went wrong!!!');
    }
    return await messagesResponse.json();
  }
}

export const fetchAdminMessages = async (authState: any, currentPage: number, messagesPerPage: number) => {
  if (authState?.isAuthenticated) {
    const url = `${messagesServiceUrl()}/search/findByClosed?closed=false&page=${currentPage-1}$size=${messagesPerPage}`;
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        'Content-Type': 'application/json'
      }
    };
    const messagesResponse = await fetch(url, requestOptions);
    if (!messagesResponse.ok) {
      throw new Error('Something went wrong!!!');
    }
    return await messagesResponse.json();
  }
}

export const submitResponseToQuestionPostedByUser = async (authState: any, messageId: number, response: string) => {
  const url = `${messagesServiceUrl()}/secure/admin/message`;
  if (authState?.isAuthenticated && messageId !=null && response !==null ) {
    const messageAdminRequestModel: AdminMessageRequest = new AdminMessageRequest(messageId, response);
    const requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messageAdminRequestModel)
    };
    const messageAdminRequestModelResponse = await fetch(url, requestOptions);
    if (!messageAdminRequestModelResponse.ok) {
      throw new Error(`Something went wrong!!!`);
    }
  }
}