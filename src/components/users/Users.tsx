import React from 'react';
import s from './User.module.css'
import { UserType } from '../../redux/users-reducer';
import photo from '../../assets/friend4.jpg';
import loadingImg from '../../assets/spinning-dots.svg'
import { Preloader } from '../common/Preloader';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { usersApi } from '../../redux/api';
import { useDispatch } from 'react-redux';

type UsersPropsType = {
  totalUsersCount: number
  pageCount: number
  currentPage: number
  setCurrentPage: (pageNumber: number) => void
  updateFollow: (userId: number) => void
  toggleIsFollingInProgress: (userId: number, isFetched: boolean) => void
  users: UserType[]
  isFetched: boolean
  isFollowingInProgress: Array<number>
}

export const Users: React.FC<UsersPropsType> = (props: UsersPropsType) => {
  console.log('Users')

  let totalPageCount = Math.ceil(props.totalUsersCount / props.pageCount);
  const totalPageCountArr = [];

  for (let i = 1; i <= totalPageCount; i++) {
    totalPageCountArr.push(i);
  }

  return (
    <div className={s.content}>
    {props.isFetched ? <Preloader />: ''}

    {totalPageCountArr.map(page => {
      return <span key={page + 156789}
                    className={`${s.page_number}
                    ${props.currentPage === page
                      ? s.page_current
                      : ''}
                    `}
                    onClick={(e) => props.setCurrentPage(page)}>
              {page}
            </span>
    })}


    {props.users.map(user => <div key={user.id + Math.random()} className={s.user_wrapper}>
        <div className={s.user_info}>
          <NavLink to={'profile/' + user.id}><img src={user.photos.small != null ? user.photos.small : photo} alt="user" /></NavLink>

          {user.followed === true
            ? <button disabled={props.isFollowingInProgress.some(id => id === user.id)} onClick={() => {
              //unfollow the user
              props.toggleIsFollingInProgress(user.id, true);
              usersApi.unfollowUser(user.id)
                .then(data => {
                  if (data.resultCode === 0) {
                    props.updateFollow(user.id)
                  }
                  props.toggleIsFollingInProgress(user.id, false);
                })
            }}>
            Unfollow</button>

            : <button disabled={props.isFollowingInProgress.some(id => id === user.id)} onClick={() => {
              //follow the user
                props.toggleIsFollingInProgress(user.id, true);
                usersApi.followUser(user.id)
                  .then((data) => {
                    if (data.resultCode === 0) {
                      props.updateFollow(user.id)
                    }
                    props.toggleIsFollingInProgress(user.id, false);
                  })
              }}>Follow</button>
            }
        </div>

        <div className={s.status_wrapper}>
          <h3>{user.name}</h3>
          <p className={s.status_text}>{user.status} </p>
        </div>

        <div className={s.location_wrapper}>
          <span>{"user.location.country"}</span>
          <span>{"user.location.city"}</span>
        </div>

      </div>)}
  </div>
  );
};

