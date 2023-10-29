import React from 'react';
import photo1 from '../../assets/cat-header.jpg';
import photo5 from '../../assets/friend5.jpg';
import photo4 from '../../assets/friend4.jpg'
import photo3 from '../../assets/friend3.jpg'
import s from './Profile.module.css'

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

        <div className={s.message_wrapper}>
          <div className={s.message_user_wrapper}>

            <div className={s.user_info}>
              <img src={photo5} alt="user" />
              <div className={s.user_name}>
                <h3>Anny O’Connel</h3>
                <p>2 days ago</p>
              </div>
            </div>

            <p className={s.message_text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fames ac turpis egestas maecenas pharetra convallis posuere morbi leo. Ut sem nulla pharetra diam sit amet nisl suscipit adipiscing. Luctus accumsan tortor </p>

            <div className={s.services}>
              <div className={s.like_wrapper}>
                <img src="" alt="" />
                <span>like</span>
              </div>
              <div>
                <img src="" alt="" />
                <span>reply</span>
              </div>
            </div>

          </div>

          <div className={s.message_user_wrapper}>

            <div className={s.user_info}>
              <img src={photo3} alt="user" />
              <div className={s.user_name}>
                <h3>Anny O’Connel</h3>
                <p>2 days ago</p>
              </div>
            </div>

            <p className={s.message_text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fames ac turpis egestas maecenas pharetra convallis posuere morbi leo. Ut sem nulla pharetra diam sit amet nisl suscipit adipiscing. Luctus accumsan tortor </p>

            <div className={s.services}>
              <div className={s.like_wrapper}>
                <img src="" alt="" />
                <span>like</span>
              </div>
              <div>
                <img src="" alt="" />
                <span>reply</span>
              </div>
            </div>

          </div>

          <div className={s.message_user_wrapper}>

            <div className={s.user_info}>
              <img src={photo4} alt="user" />
              <div className={s.user_name}>
                <h3>Anny O’Connel</h3>
                <p>2 days ago</p>
              </div>
            </div>

            <p className={s.message_text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fames ac turpis egestas maecenas pharetra convallis posuere morbi leo. Ut sem nulla pharetra diam sit amet nisl suscipit adipiscing. Luctus accumsan tortor </p>

            <div className={s.services}>
              <div className={s.like_wrapper}>
                <img src="" alt="" />
                <span>like</span>
              </div>
              <div>
                <img src="" alt="" />
                <span>reply</span>
              </div>
            </div>

          </div>

        </div>

    </div>
  );
};
