import React from 'react';
import s from './ChatMenu.module.css'
import { NavLink } from 'react-router-dom';

export const ChatMenu = () => {
  return (
    <div className={s.chat_wrapper}>
      <div className={s.chat_content_wrapper}>
        <h2>Let's Chat</h2>
        <ul>
          <li><NavLink to='/messages/1' className={s.chatItem}>Pumpkine</NavLink></li>
          <li><NavLink to='/messages/2' className={s.chatItem}>Missis Marple</NavLink></li>
          <li><NavLink to='/messages/3' className={s.chatItem}>Luna</NavLink></li>
          <li><NavLink to='/messages/4' className={s.chatItem}>Toby</NavLink></li>
          <li><NavLink to='/messages/5' className={s.chatItem}>Cleo</NavLink></li>
          <li><NavLink to='/messages/6' className={`${s.chatItem} ${s.active}`}>Choupette</NavLink></li>
        </ul>

      </div>

    </div>
  );
};

