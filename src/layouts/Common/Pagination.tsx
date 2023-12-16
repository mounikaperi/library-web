export const Pagination: React.FC<{ currentPage: number, totalPages: number, paginate: any }> = (props) => {
  const pushPageNumber = (pageNumber: any, totalPages: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      pageNumbers.push(pageNumber);
    }
  };
  const generatePageNumbers = (currentPage: number, totalPages: number) => {
    const pageNumbers: any = [];
    pushPageNumber(currentPage, totalPages);
    pushPageNumber(currentPage - 1, totalPages);
    pushPageNumber(currentPage - 2, totalPages);
    pushPageNumber(currentPage + 1, totalPages);
    pushPageNumber(currentPage + 2, totalPages);
    return pageNumbers;
  };
  const pageNumbers = generatePageNumbers(props.currentPage, props.totalPages);
  return (
    <nav aria-label="...">
      <ul className='pagination'>
        <li className='page-item' onClick={() => props.paginate(1)}>
          <button className='page-link'>
            First Page
          </button>
        </li>
        {pageNumbers.map((number: any) => (
          <li key={number} onClick={() => props.paginate(number)}
            className={'page-item ' + (props.currentPage === number ? 'active' : '')}>
            <button className='page-link'>
              {number}
            </button>
          </li>
        ))}
        <li className='page-item' onClick={() => props.paginate(props.totalPages)}>
          <button className='page-link'>
            Last Page
          </button>
        </li>
      </ul>
    </nav>
  );
}