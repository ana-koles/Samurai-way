import React from 'react';
import s from './Message.module.css'
import photo5 from '../../../../assets/friend5.jpg'

export const Message = () => {
  return (
    <div className={s.message_user_wrapper}>

    <div className={s.user_info}>
      <img src={photo5} alt="user" />
      <div className={s.user_name}>
        <h3>Anny O’Connel</h3>
        <p>2 days ago</p>
      </div>
    </div>

    <p className={s.message_text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fames ac turpis egestas maecenas pharetra convallis posuere morbi leo. Ut sem nulla pharetra diam sit amet nisl suscipit adipiscing. Luctus accumsan tortor </p>

    <div className={s.services}>
      <div className={s.like_wrapper}>
        <img src="" alt="" />
        <span>like</span>
      </div>
      <div>
        <img src="" alt="" />
        <span>reply</span>
      </div>
    </div>

  </div>
  );
};

