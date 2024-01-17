import React from 'react';
import s from './User.module.css'
import { UserType } from '../../redux/users-reducer';
import photo from '../../assets/friend4.jpg';
import loadingImg from '../../assets/spinning-dots.svg'
import { Preloader } from '../common/Preloader';
import { NavLink } from 'react-router-dom';

type UsersPropsType = {
  totalUsersCount: number
  pageCount: number
  currentPage: number
  setCurrentPage: (pageNumber: number) => void
  updateFollow: (userId: number) => void
  users: UserType[]
  isFetched: boolean
}

export const Users: React.FC<UsersPropsType> = (props: UsersPropsType) => {

  let totalPageCount = Math.ceil(props.totalUsersCount / props.pageCount);
  const totalPageCountArr = [];

  for (let i = 1; i <= totalPageCount; i++) {
    totalPageCountArr.push(i);
  }

  return (
    <div className={s.content}>
    {props.isFetched ? <Preloader />: ''}

    {totalPageCountArr.map(page => {
      return <span key={page + 156789} className={`${s.page_number} ${props.currentPage === page ? s.page_current : ''}`} onClick={(e) => props.setCurrentPage(page)}>  {page}  </span>
    })}


    {/* <button onClick={this.getUsers}>Get Users</button> */}
    {props.users.map(user => <div key={user.id + Math.random()} className={s.user_wrapper}>
        <div className={s.user_info}>
          <NavLink to={'profile/' + user.id}><img src={user.photos.small != null ? user.photos.small : photo} alt="user" /></NavLink>
          {user.followed === true ? <button onClick={() => props.updateFollow(user.id)}>Unfollow</button> : <button onClick={() => props.updateFollow(user.id)}>Follow</button>}
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

