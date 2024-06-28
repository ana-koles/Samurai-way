import React, { useState } from 'react';
import s from './Pagination.module.css'
type Props = {
  totalItemsCount: number
  pageCount: number
  currentPage: number
  setCurrentPage: (pageNumber: number) => void
  portionSize?: number
}

export const Pagination = ({totalItemsCount, pageCount, currentPage, setCurrentPage, portionSize = 10}: Props) => {

  let totalPageCount = Math.ceil(totalItemsCount / pageCount);
  const pagesCountArr = [];

  for (let i = 1; i <= totalPageCount; i++) {
    pagesCountArr.push(i);
  }

  let portionCount = Math.ceil(totalPageCount / portionSize);
  const [portionNumber, setPortionNumber] = useState(1);
  let leftPortionElement = (portionNumber - 1) * portionSize + 1;
  let rightPortionElement = portionSize * portionNumber;

  const goToPreviousPortion = () => {
    setPortionNumber(portionNumber - 1)
  }

  const goToNextPortion = () => {
    setPortionNumber(portionNumber + 1)
  }

  return (
    <>
    {portionNumber > 1 && <button onClick={goToPreviousPortion}>Previous</button>}

    {pagesCountArr.filter(page => page >=leftPortionElement && page <=rightPortionElement)
                  .map(page => {
                    return <span key={page + 156789}
                                  className={`${currentPage === page ? s.page_current : ''}`}
                                  onClick={(e) => setCurrentPage(page)}>
                            {page}
                          </span>
                  })

    }
    {portionNumber < portionCount && <button onClick={goToNextPortion}>Next</button> }

    </>

  );
};

