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