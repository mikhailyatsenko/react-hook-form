import React from 'react';

interface Props {
  currentPage: number;
  changePage: (page: number) => void;
  totalPages: number;
}

class Pagination extends React.Component<Props, Record<string, never>> {
  render() {
    const { currentPage, changePage, totalPages } = this.props;
    const pagesToDisplay = [];
    const maxPageLimitToDisplay = () =>
      totalPages < 6 ? totalPages : currentPage + 6;
    for (let i = currentPage; i < maxPageLimitToDisplay(); i++) {
      pagesToDisplay.push(i);
    }
    return (
      <>
        <div className="pagination">
          <div onClick={() => changePage(currentPage - 1)}>&laquo;</div>

          {pagesToDisplay.map((page, index) => (
            <div
              key={index}
              onClick={() => changePage(page)}
              className={page === currentPage ? 'active' : ''}
            >
              {page}
            </div>
          ))}
          <div onClick={() => changePage(currentPage + 1)}>&raquo;</div>
        </div>
      </>
    );
  }
}

export default Pagination;
