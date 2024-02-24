import React from 'react';
import s from './User.module.css'
import { UserType } from '../../redux/users-reducer';
import photo from '../../assets/friend4.jpg';
import { Preloader } from '../common/Preloader';
import { NavLink } from 'react-router-dom';
import { usersApi } from '../../redux/api';
import { Pagination } from '../common/pagination/Pagination';
import { User } from './user/User';

type UsersPropsType = {
  totalUsersCount: number
  pageCount: number
  currentPage: number
  users: UserType[]
  isFetched: boolean
  isFollowingInProgressUsersId: Array<number>
  setCurrentPage: (pageNumber: number) => void
  updateFollow: (userId: number) => void
  toggleIsFollingInProgress: (userId: number, isFetched: boolean) => void
}

export const Users = (props: UsersPropsType) => {

/*   let totalPageCount = Math.ceil(props.totalUsersCount / props.pageCount);
  const totalPageCountArr = [];

  for (let i = 1; i <= totalPageCount; i++) {
    totalPageCountArr.push(i);
  } */

  return (
    <div className={s.content}>
      {props.isFetched ? <Preloader />: ''}

    {/*  {totalPageCountArr.map(page => {
        return <span key={page + 156789}
                      className={`${props.currentPage === page ? s.page_current : ''}`}
                      onClick={(e) => props.setCurrentPage(page)}>
                {page}
              </span>
      })} */}

      <Pagination  totalUsersCount={props.totalUsersCount} pageCount={props.pageCount} currentPage={props.currentPage} setCurrentPage={props.setCurrentPage}/>

      {props.users.map(user => <User key={user.id + Math.random()}
                                      user={user}
                                      toggleIsFollingInProgress={props.toggleIsFollingInProgress}
                                      isFollowingInProgressUsersId={props.isFollowingInProgressUsersId}
                                      updateFollow={props.updateFollow}
                                    />)}

  </div>
  );
};

