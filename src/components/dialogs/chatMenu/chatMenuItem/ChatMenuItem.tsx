import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './ChatMenuItem.module.css'


type ChatMenuItemPropsType = {
  name: string
  id: number
}

export const ChatMenuItem = (props:ChatMenuItemPropsType) => {

  let {name, id} = props;

  let path = '/messages/' + id;

  return (
    <li><NavLink to={path} className={s.chatItem}>{name}</NavLink></li>
  );
};
