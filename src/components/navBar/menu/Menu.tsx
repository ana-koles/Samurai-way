import React from 'react';
import s from './Menu.module.css'
import { NavLink } from 'react-router-dom';

export const Menu = () => {
  return (
    <ul className={s.menu_list}>
      <li><NavLink activeClassName={s.activeLink} to='/profile'>Profile</NavLink></li>
      <li><NavLink activeClassName={s.activeLink} to='/messages/1'>Messages</NavLink></li>
      <li><NavLink activeClassName={s.activeLink} to='/news'>News</NavLink></li>
      <li><NavLink activeClassName={s.activeLink} to='/music'>Music</NavLink></li>
      <li><NavLink activeClassName={s.activeLink} to='/settings'>Settings</NavLink></li>
      <li><NavLink activeClassName={s.activeLink} to='/users'>Users</NavLink></li>
    </ul>
  );
};

