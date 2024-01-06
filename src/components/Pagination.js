import React, { useMemo } from 'react';
import './Pagination.css';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const visiblePages = useMemo(() => {
    const totalVisiblePages = 5;
    const buffer = 2;
    let startPage = Math.max(1, currentPage - buffer);
    let endPage = Math.min(totalPages, currentPage + buffer);

    // Adjust if we are near the start or end
    if (currentPage - buffer <= 1) {
      endPage = totalVisiblePages;
    }
    if (currentPage + buffer >= totalPages) {
      startPage = Math.max(1, totalPages - totalVisiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  }, [totalPages, currentPage]);

  return (
    <div className="pagination-container">
      {visiblePages.map((page, index) => (
        <React.Fragment key={index}>
          {index > 0 && page !== visiblePages[index - 1] + 1 && <span className="ellipsis">...</span>}
          <button
            className={`pagination-number ${currentPage === page ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Pagination;
