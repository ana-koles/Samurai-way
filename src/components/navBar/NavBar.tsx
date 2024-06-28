import React from 'react';
import s from './NavBar.module.css'
import { FriendsSection } from './friendsSection/FriendsSection';
import { Menu } from './menu/Menu';

export const NavBar = () => {
  return (
    <nav className={s.navigation}>
      <div className={s.menu}>
        <h2 className={`${s.active} ${s.test}`}>Menu</h2>
        <Menu/>
      </div>
      <FriendsSection/>
    </nav>
  );
};
