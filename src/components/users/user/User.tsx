import React from 'react';
import s from '../User.module.css'
import photo from '../../../assets/friend4.jpg'
import { UserType } from '../../../redux/users-reducer';
import { NavLink } from 'react-router-dom';
import { usersApi } from '../../../redux/api';


type UserProps = {
  user: UserType
  isFollowingInProgressUsersId: Array<number>
  toggleIsFollingInProgress: (userId: number, isFetched: boolean) => void
  updateFollow: (userId: number) => void
}

export const User = ({user, toggleIsFollingInProgress, isFollowingInProgressUsersId, updateFollow}: UserProps) => {

  return (
    <div className={s.user_wrapper}>
        <div className={s.user_info}>
          <NavLink to={'profile/' + user.id}><img src={user.photos.small != null ? user.photos.small : photo} alt="user" /></NavLink>

          {user.followed === true
            ? <button disabled={isFollowingInProgressUsersId.some(id => id === user.id)} onClick={() => {
              //unfollow the user
              toggleIsFollingInProgress(user.id, true);
              usersApi.unfollowUser(user.id)
                .then(data => {
                  if (data.resultCode === 0) {
                    updateFollow(user.id)
                  }
                  toggleIsFollingInProgress(user.id, false);
                })
            }}>
            Unfollow</button>

            : <button disabled={isFollowingInProgressUsersId.some(id => id === user.id)} onClick={() => {
              //follow the user
                toggleIsFollingInProgress(user.id, true);
                usersApi.followUser(user.id)
                  .then((data) => {
                    if (data.resultCode === 0) {
                      updateFollow(user.id)
                    }
                    toggleIsFollingInProgress(user.id, false);
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
  </div>

  );
};

