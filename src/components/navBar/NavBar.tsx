import React from 'react';
import s from './NavBar.module.css'
import { FriendsSection } from './friendsSection/FriendsSection';

export const NavBar = () => {
  return (
    <nav className={s.navigation}>
      <div className={s.menu}>
        <h2 className={`${s.active} ${s.test}`}>Menu</h2>
        <ul>
          <li><a href='#'>Profile</a></li>
          <li><a href='#'>Messages</a></li>
          <li><a href='#'>News</a></li>
          <li><a href='#'>Music</a></li>
          <li><a href='#'>Settings</a></li>
        </ul>

      </div>

      <FriendsSection/>

    </nav>
  );
};
