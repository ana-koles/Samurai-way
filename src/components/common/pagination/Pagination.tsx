import React from 'react';
import s from './Pagination.module.css'


type Props = {
  totalUsersCount: number
  pageCount: number
  currentPage: number
  setCurrentPage: (pageNumber: number) => void
}

export const Pagination = ({totalUsersCount, pageCount, currentPage, setCurrentPage}: Props) => {

  let totalPageCount = Math.ceil(totalUsersCount / pageCount);
  const totalPageCountArr = [];

  for (let i = 1; i <= totalPageCount; i++) {
    totalPageCountArr.push(i);
  }

  return (
    <>
     {totalPageCountArr.map(page => {
      return <span key={page + 156789}
                    className={`${currentPage === page ? s.page_current : ''}`}
                    onClick={(e) => setCurrentPage(page)}>
              {page}
            </span>
    })}

    </>

  );
};

