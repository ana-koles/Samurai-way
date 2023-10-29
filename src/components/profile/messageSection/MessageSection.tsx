import React from 'react';
import s from './MessageSection.module.css'
import { Message } from './message/Message';

export const MessageSection = () => {
  return (
    <div className={s.message_wrapper}>
      
      <Message/>
      <Message/>
      <Message/>

    </div>
  );
};

