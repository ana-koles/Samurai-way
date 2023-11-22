import React from 'react';
import logo from '../../assets/logo.svg';
import photo from '../../assets/cat-profile2.jpg';
import s from './Header.module.css'
import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <header className={s.header}>

      <div className={s.logo_wrapper}>
        <img src={logo} alt="logo" />
        <h2>CATSBOOK</h2>
      </div>

      <ul className={s.icon_list}>
        <li><NavLink activeClassName={s.activeLink} to='/messages'>Chat</NavLink></li>
        <li><NavLink activeClassName={s.activeLink} to='/settings'>Settings</NavLink></li>
        <li><img src={photo} alt="photo" /></li>
      </ul>

    </header>
  );
};
