import React, { useState } from 'react';
import s from './Pagination.module.css'
import classNames from 'classnames';

//использование classnames для конкотинация стилей

{/* <div className={classNames(s.pagination, {
  [s.block] : page > 5
})}></div>

<div className={classNames(s.pagination, s.block)}></div> */}

type Props = {
  totalItemsCount: number
  pageCount: number
  currentPage: number
  setCurrentPage: (pageNumber: number) => void
  portionSize?: number //кол-во номеров страниц, которые мы видим в погинации
}

export const Pagination = ({totalItemsCount, pageCount, currentPage, setCurrentPage, portionSize = 10}: Props) => {

  let totalPageCount = Math.ceil(totalItemsCount / pageCount); //150 item / 5 items per page = 30 pages
  const pagesCountArr = [];

  for (let i = 1; i <= totalPageCount; i++) {
    pagesCountArr.push(i);
  }

  let portionCount = Math.ceil(totalPageCount / portionSize); //30 pages / 10 items in the visible pagination line = 3 portions (left - center- right)
  const [portionNumber, setPortionNumber] = useState(1); //portion number (we have 3 portions)
  let leftPortionElement = (portionNumber - 1) * portionSize + 1; // (2 - 1) * 10 + 1 = 2nd portion starts with 11;
  let rightPortionElement = portionSize * portionNumber; // 10 * 2 = 2nd portion ends with 20th element

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

