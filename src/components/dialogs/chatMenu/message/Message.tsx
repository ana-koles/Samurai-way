import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Message.module.css'


type MessagePropsType = {
  name: string
  id: number
}

export const Message: React.FC<MessagePropsType> = (props) => {

  let {name, id} = props;

  let path = '/messages/' + id;

  return (
    <li><NavLink to={path} className={s.chatItem}>{name}</NavLink></li>
  );
};
