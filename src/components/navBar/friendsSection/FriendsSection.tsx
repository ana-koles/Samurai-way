import React from 'react';
import s from './FriendsSection.module.css';
import { Friend } from './friend/Friend';




export const FriendsSection = () => {

  const friends = [
    {
      id: Date.now() * Math.random(),
      name: 'Missis Marple',
      src: '../../../assets/friend2.jpg'
    },
    {
      id: Date.now() * Math.random(),
      name: 'Cinderella',
      src: '../../../assets/friend2.jpg'
    },
    {
      id: Date.now() * Math.random(),
      name: 'Teddy',
      src: '../../../assets/friend3.jpg'
    },
    {
      id: Date.now() * Math.random(),
      name: 'Choupette',
      src: '../../../assets/friend4.jpg'
    },
    {
      id: Date.now() * Math.random(),
      name: 'Pumpkin',
      src: '../../../assets/friend5.jpg'
    }

  ]


  return (
    <div className={s.friends_wrapper}>
        <h2>Friends (100) </h2>

        {friends.map(f => <Friend key={f.id} {...f}/>)}

        {/* <Friend/>
        <Friend/>
        <Friend/>
        <Friend/>
        <Friend/> */}

        <a>View all</a>

      </div>
  );
};

