import React from 'react';
import logo from '../../assets/logo.svg';
import photo from '../../assets/cat-profile2.jpg';
import s from './Header.module.css'

export const Header = () => {
  return (
    <header className={s.header}>

      <div className={s.logo_wrapper}>
        <img src={logo} alt="logo" />
        <h2>CatFriends</h2>
      </div>

      <ul className={s.icon_list}>
        <li><a href='#'>Chat</a></li>
        <li><a href='#'>Settings</a></li>
        <li><img src={photo} alt="photo" /></li>
      </ul>

    </header>
  );
};
