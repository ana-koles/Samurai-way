import React from 'react';
import s from './Post.module.css'
import photo5 from '../../../../assets/friend5.jpg'
import like from  '../../../../assets/icons/heart.png'
import reply from '../../../../assets/icons/reply.png'


type PostPropsType = {
  name: string,
  message: string,
  likes: number
}

export const Post: React.FC<PostPropsType> = (props) => {

  const {name, message, likes} = props

  return (
    <div className={s.message_user_wrapper}>

      <div className={s.user_info}>
        <img src={photo5} alt="user" />
        <div className={s.user_name}>
          <h3>{name}</h3>
          <p>2 days ago</p>
        </div>
      </div>

      <p className={s.message_text}>{message} </p>

      <div className={s.services}>
        <div className={s.like_wrapper}>
          <img src={like} alt="like" />
          <span>{likes}</span>
        </div>
        <div>
          <img src={reply} alt="reply" />
          <span>reply</span>
        </div>
      </div>

    </div>
  );
};

