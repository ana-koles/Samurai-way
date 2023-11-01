import React from 'react';
import s from './ChatMenu.module.css'

export const ChatMenu = () => {
  return (
    <div className={s.chat_wrapper}>
      <div className={s.chat_content_wrapper}>
        <h2>Let's Chat</h2>
        <ul>
          <li><a>Pumpkine</a></li>
          <li><a>Missis Marple</a></li>
          <li><a>Luna</a></li>
          <li><a>Toby</a></li>
          <li><a>Cleo</a></li>
        </ul>

      </div>

    </div>
  );
};

