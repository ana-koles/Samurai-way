import React from 'react';
import s from './Friend.module.css'
import friend1 from '../../../../assets/friend1.jpg'

type FriendPropsType = {
  name: string,
  src: string
}

export const Friend:React.FC<FriendPropsType> = (props) => {

  return (

    <div className={s.friend}>
      <img src={friend1} alt="friend" />
      <div className={s.friend_text_wrapper}>
        <h3>{props.name}</h3>
        <p>Online</p>
      </div>
    </div>
  );
};

