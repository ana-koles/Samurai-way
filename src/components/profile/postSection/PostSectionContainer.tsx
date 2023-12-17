import React from 'react';
import s from './PostSection.module.css'
import { addPostAC, updateNewPostTextAC } from '../../../redux/profile-reducer';
import { PostSection } from './PostSection';
import { connect } from 'react-redux';
import { AppRootStateType } from '../../../redux/redux-store';

/* type PostSectionPropsType = {
  posts: PostType[]
  currentText: string
  dispatch: (action: ActionType) => void
  user: UserType
} */
/* type PostSectionPropsType = {
  store: any
} */

/* export const PostSectionContainer: React.FC<PostSectionPropsType> = (props) => {

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
}; */

const mapStateToProps = (state: AppRootStateType) => {
  return {
    posts: state.profilePage.posts,
    currentText: state.profilePage.currentText
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addPost: (name: string) => {
      dispatch(addPostAC(name))
    },
    updateNewPostText: (text: string) => {
      dispatch(updateNewPostTextAC(text))
    }
  }
}

export const PostSectionContainer = connect(mapStateToProps, mapDispatchToProps)(PostSection)