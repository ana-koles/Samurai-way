import React from 'react';
import photo1 from '../assets/cat-header.jpg';
import photo2 from '../assets/cat-profile2.jpg';
import photo3 from '../assets/friend3.jpg'

export const Profile = () => {
  return (
    <div className='content'>

        <div className='profile-wrapper'>
          <div className ='content-wrapper'>
            <div className='photo'></div>
            <div className='info-wrapper'>
              <h2>Anastasiya K.</h2>
              <p>Date of Birth: July 6</p>
              <p>City: Minsk</p>
              <p>Education: BSEU</p>
              <p>GitHub: </p>
            </div>
          </div>
        </div>

        <div className='message-wrapper'>
          <div className='message-user_wrapper'>

            <div className='user-info'>
              <img src={photo3} alt="user" />
              <div className='user-name'>
                <h3>Anny O’Connel</h3>
                <p>2 days ago</p>
              </div>
            </div>

            <p className='message-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fames ac turpis egestas maecenas pharetra convallis posuere morbi leo. Ut sem nulla pharetra diam sit amet nisl suscipit adipiscing. Luctus accumsan tortor </p>

            <div className='services'>
              <div className='like-wrapper'>
                <img src="" alt="" />
                <span>like</span>
              </div>
              <div>
                <img src="" alt="" />
                <span>reply</span>
              </div>
            </div>

          </div>

          <div className='message-user_wrapper'>

            <div className='user-info'>
              <img src={photo3} alt="user" />
              <div className='user-name'>
                <h3>Anny O’Connel</h3>
                <p>2 days ago</p>
              </div>
            </div>

            <p className='message-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fames ac turpis egestas maecenas pharetra convallis posuere morbi leo. Ut sem nulla pharetra diam sit amet nisl suscipit adipiscing. Luctus accumsan tortor </p>

            <div className='services'>
              <div className='like-wrapper'>
                <img src="" alt="" />
                <span>like</span>
              </div>
              <div>
                <img src="" alt="" />
                <span>reply</span>
              </div>
            </div>

          </div>

          <div className='message-user_wrapper'>

            <div className='user-info'>
              <img src={photo3} alt="user" />
              <div className='user-name'>
                <h3>Anny O’Connel</h3>
                <p>2 days ago</p>
              </div>
            </div>

            <p className='message-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fames ac turpis egestas maecenas pharetra convallis posuere morbi leo. Ut sem nulla pharetra diam sit amet nisl suscipit adipiscing. Luctus accumsan tortor </p>

            <div className='services'>
              <div className='like-wrapper'>
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
