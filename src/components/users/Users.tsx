import React from 'react';
import s from './User.module.css'
import { UserType } from '../../redux/users-reducer';
import { Preloader } from '../common/Preloader';
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

  return (
    <div className={s.content}>
      {props.isFetched ? <Preloader />: ''}

      <Pagination  totalItemsCount={props.totalUsersCount} pageCount={props.pageCount} currentPage={props.currentPage} setCurrentPage={props.setCurrentPage}/>

      {props.users.map(user => <User key={user.id}
                                      user={user}
                                      toggleIsFollingInProgress={props.toggleIsFollingInProgress}
                                      isFollowingInProgressUsersId={props.isFollowingInProgressUsersId}
                                      updateFollow={props.updateFollow}
                                    />)}

  </div>
  );
};

