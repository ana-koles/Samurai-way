import React from 'react';
import logo from '../assets/logo.svg';
import photo from '../assets/cat-profile2.jpg'

export const Header = () => {
  return (
    <header className='header'>

      <div className='logo_wrapper'>
        <img src={logo} alt="logo" />
        <h2>Friends</h2>
      </div>

      <ul className='icon_list'>
        <li><a href='#'>Chat</a></li>
        <li><a href='#'>Settings</a></li>
        <li><img src={photo} alt="photo" /></li>
      </ul>

    </header>
  );
};
