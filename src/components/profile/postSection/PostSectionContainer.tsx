import React from 'react';
import s from './PostSection.module.css'
import { Post } from './posts/Post';
import { ActionType,PostType, UserType} from '../../../redux/store';

import { Button } from '../../button/Button';
import { addPostAC, updateNewPostTextAC } from '../../../redux/profile-reducer';
import { PostSection } from './PostSection';

/* type PostSectionPropsType = {
  posts: PostType[]
  currentText: string
  dispatch: (action: ActionType) => void
  user: UserType
} */
type PostSectionPropsType = {
  store: any
}

export const PostSectionContainer: React.FC<PostSectionPropsType> = (props) => {

  let state = props.store.getState();

  const addPost = (name: string) => {
    props.store.dispatch(addPostAC(name))
  }

  const updateNewPostText = (text: string) => {
    props.store.dispatch(updateNewPostTextAC(text))
  }

    return (

    <PostSection
            posts={state.profilePage.posts}
            currentText={state.profilePage.currentText}
            addPost={addPost}
            updateNewPostText={updateNewPostText}
      />
  );
};

