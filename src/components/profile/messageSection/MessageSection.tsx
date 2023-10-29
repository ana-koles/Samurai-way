import React from 'react';
import s from './MessageSection.module.css'
import { Message } from './message/Message';

export const MessageSection = () => {

  const messages = [
    {
      id: Date.now() * Math.random(),
      name:  'Missis Marple',
      message: `Paws up, it's time for another purr-fect day!`,
      likes: 21
    },
    {
      id: Date.now() * Math.random(),
      name:  'Pumpkine',
      message: `Just caught a toy mouse 🐭 and feeling like a true hunter! 😼`,
      likes: 7
    },
    {
      id: Date.now() * Math.random(),
      name:  'Choupette',
      message: `Is it dinner time yet? I'm feline pretty hungry. 🍽️`,
      likes: 12
    },

  ]

  return (
    <div className={s.message_wrapper}>

      {messages.map(m => <Message key={m.id} {...m}/>)}


    </div>
  );
};

