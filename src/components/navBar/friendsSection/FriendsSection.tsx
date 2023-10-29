import React from 'react';
import s from './FriendsSection.module.css';
import { Friend } from './friend/Friend';


export const FriendsSection = () => {
  return (
    <div className={s.friends_wrapper}>
        <h2>Friends (100) </h2>

        <Friend/>
        <Friend/>
        <Friend/>
        <Friend/>
        <Friend/>

        <a>View all</a>

      </div>
  );
};

