import { historyServiceUrl } from "../utils/urlConfig"

export const fetchHistory = async (authState: any, currentPage: number, size: number) => {
   if (authState?.isAuthenticated) {
    const url = `${historyServiceUrl()}/search/findBooksByUserEmail?userEmail=${authState.accessToken?.claims.sub}&page=${currentPage - 1 }&size=${size}`;
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const historyResponse = await fetch(url, requestOptions);
    if (!historyResponse.ok) {
      throw new Error('Something went wrong');
    }
    return await historyResponse.json();
   }
}