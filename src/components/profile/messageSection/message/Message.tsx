import React from 'react';
import s from './Message.module.css'
import photo5 from '../../../../assets/friend5.jpg'


type MessagePropsType = {
  key: number | undefined,
  name: string,
  message: string,
  likes: number
}

export const Message: React.FC<MessagePropsType> = (props) => {
  return (
    <div className={s.message_user_wrapper}>

    <div className={s.user_info}>
      <img src={photo5} alt="user" />
      <div className={s.user_name}>
        <h3>{props.name}</h3>
        <p>2 days ago</p>
      </div>
    </div>

    <p className={s.message_text}>{props.message} </p>

    <div className={s.services}>
      <div className={s.like_wrapper}>
        <img src="" alt="" />
        <span>{props.likes} likes</span>
      </div>
      <div>
        <img src="" alt="" />
        <span>reply</span>
      </div>
    </div>

  </div>
  );
};

