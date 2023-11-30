import React from 'react';
import s from './Profile.module.css'
import { PostSection } from './postSection/PostSection';
import { PostType } from '../../redux/state';

type ProfilePropsType = {
  posts: PostType[]
  addPost: (text: string) => void
}


export const Profile: React.FC<ProfilePropsType> = (props) => {

  return (
    <div className={s.content}>

        <div className={s.profile_wrapper}>
          <div className ={s.content_wrapper}>
            <div className={s.photo}></div>
            <div className={s.info_wrapper}>
              <h2>Fluffy Gangster</h2>
              <p>Date of Birth: July 6</p>
              <p>City: New York</p>
              <p>Hobby: wait for me to be fed</p>
              <p>GitHub: </p>
            </div>
          </div>
        </div>

        <PostSection
            posts={props.posts}
            addPost={props.addPost}/>
    </div>
  );
};
