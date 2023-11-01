import React from 'react';
import s from './Menu.module.css'

export const Menu = () => {
  return (
    <ul className={s.menu_list}>
      <li><a className={s.active} href='#'>Profile</a></li>
      <li><a href='#'>Messages</a></li>
      <li><a href='#'>News</a></li>
      <li><a href='#'>Music</a></li>
      <li><a href='#'>Settings</a></li>
    </ul>
  );
};

