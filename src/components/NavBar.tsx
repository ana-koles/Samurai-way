import React from 'react';
import friend1 from '../assets/friend1.jpg';
import friend2 from '../assets/friend2.jpg';
import friend3 from '../assets/friend3.jpg';
import friend4 from '../assets/friend4.jpg';
import friend5 from '../assets/friend5.jpg';

export const NavBar = () => {
  return (
    <nav className='navigation'>
      <div className='menu'>
        <h2>Menu</h2>
        <ul>
          <li><a href='#'>Profile</a></li>
          <li><a href='#'>Messages</a></li>
          <li><a href='#'>News</a></li>
          <li><a href='#'>Music</a></li>
          <li><a href='#'>Settings</a></li>
        </ul>

      </div>

      <div className='friends-wrappe/*  */r'>
        <h2>Friends (100) </h2>
          <div className='friend'>
            <img src={friend1} alt="" />
            <div className='friend-text_wrapper'>
              <h3>Missis Marple</h3>
              <p>Online</p>
            </div>
          </div>

          <div className='friend'>
            <img src={friend2} alt="" />
            <div className='friend-text_wrapper'>
              <h3>Missis Marple</h3>
              <p>Online</p>
            </div>
          </div>

          <div className='friend'>
            <img src={friend3} alt="" />
            <div className='friend-text_wrapper'>
              <h3>Missis Marple</h3>
              <p>Online</p>
            </div>
          </div>

          <div className='friend'>
            <img src={friend4} alt="" />
            <div className='friend-text_wrapper'>
              <h3>Missis Marple</h3>
              <p>Online</p>
            </div>
          </div>

          <div className='friend'>
            <img src={friend5} alt="" />
            <div className='friend-text_wrapper'>
              <h3>Missis Marple</h3>
              <p>Online</p>
            </div>
          </div>
        <a>View all</a>

      </div>

    </nav>
  );
};
