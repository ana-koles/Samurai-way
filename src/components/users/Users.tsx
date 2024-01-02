import React from 'react';
import s from './User.module.css'
import { UsersContainerPropsType } from './UsersContainer';
import catPhoto from '../../assets/friend4.jpg';

export const Users: React.FC<UsersContainerPropsType> = (props) => {
  return (
    <div className={s.content}>
      {props.users.map(user => <div key={user.id} className={s.user_wrapper}>
          <div className={s.user_info}>
            <img src={user.photo} alt="user" />
            {user.followed === true ? <button onClick={() => props.updateFollow(user.id)}>Follow</button> : <button onClick={() => props.updateFollow(user.id)}>Unfollow</button>}
          </div>

          <div className={s.status_wrapper}>
            <h3>{user.name}</h3>
            <p className={s.status_text}>{user.status} </p>
          </div>

          <div className={s.location_wrapper}>
            <span>{user.location.country}</span>
            <span>{user.location.city}</span>
          </div>

        </div>)}
    </div>
  );
};

