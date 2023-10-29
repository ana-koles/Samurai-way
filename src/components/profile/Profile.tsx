import React from 'react';
import s from './Profile.module.css'
import { MessageSection } from './messageSection/MessageSection';

export const Profile = () => {
  return (
    <div className={s.content}>

        <div className={s.profile_wrapper}>
          <div className ={s.content_wrapper}>
            <div className={s.photo}></div>
            <div className={s.info_wrapper}>
              <h2>Fluffy Gangster</h2>
              <p>Date of Birth: July 6</p>
              <p>City: Minsk</p>
              <p>Hobby: wait for me to be fed</p>
              <p>GitHub: </p>
            </div>
          </div>
        </div>

        <MessageSection/>


    </div>
  );
};
