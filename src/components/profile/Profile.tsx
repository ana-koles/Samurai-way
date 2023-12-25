import React from 'react';
import s from './Profile.module.css'
import { PostSectionContainer } from './postSection/PostSectionContainer';
import { connect } from 'react-redux';

type ProfilePropsType = {
 /*  store: any */
  /* posts: PostType[]
  currentText: string */
  /* updateNewPostText: (text: string) => void
  addPost: () => void */
  /* dispatch: (action: ActionType) => void
  user: UserType */
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

         {/* <PostSection
            posts={props.posts}
            currentText={props.currentText}
            dispatch={props.dispatch}
            user={props.user}
            updateNewPostText={props.updateNewPostText}
            addPost={props.addPost} */}

            <PostSectionContainer /* store={props.store} *//>
    </div>
  );
};

