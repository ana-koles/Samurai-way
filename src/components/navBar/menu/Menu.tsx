import React from 'react';
import s from './Menu.module.css'

export const Menu = () => {
  return (
    <ul className={s.menu_list}>
      <li><a className={s.active} href='/profile'>Profile</a></li>
      <li><a href='/messages'>Messages</a></li>
      <li><a href='/news'>News</a></li>
      <li><a href='/music'>Music</a></li>
      <li><a href='/settings'>Settings</a></li>
    </ul>
  );
};

