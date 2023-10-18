import React from 'react';
import photo1 from '../assets/cat-header.jpg';
import photo2 from '../assets/cat-profile2.jpg';

export const Profile = () => {
  return (
    <div className='content'>Main content
        <div className='image-wrapper'>
          <img src={photo1} alt="cat-header" />
        </div>

        <div className='profile'>
          <img className='profile-photo' src={photo2} alt="" />
          <div className='profile-text'>
            <h2>Anastasiya K.</h2>
            <p>Date of Birth: July 6</p>
            <p>City: Minsk</p>
            <p>Education: BSEU</p>
            <p>GitHub: </p>
          </div>
        </div>

        <div className='post-wrapper'>
          <h2>My Posts</h2>
          <textarea name="" id="" cols={30} rows={10}></textarea>
          <button>Send</button>

          <div className='post'>
            <div className="post-img"></div>
            <p>How are you doing?</p>
          </div>

          <div className='post'>
            <div className="post-img"></div>
            <p>Doing great</p>
          </div>
        </div>
      </div>
  );
};
