import React from 'react';
import s from './PostSection.module.css'
import { PostType, ProfileReducerActionType, addPostAC, updateNewPostTextAC } from '../../../redux/profile-reducer';
import { PostSection } from './PostSection';
import { connect } from 'react-redux';
import { AppRootStateType } from '../../../redux/redux-store';
import { Dispatch } from 'redux';

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

type MapStateToPropsType = {
  posts: PostType[]
  currentText: string
}

type MapDispatchToPropsType = {
  addPost: (name: string) => void
  updateNewPostText: (text: string) => void
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
  return {
    posts: state.profilePage.posts,
    currentText: state.profilePage.currentText
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ProfileReducerActionType>): MapDispatchToPropsType => {
  return {
    addPost: (name) => {
      dispatch(addPostAC(name))
    },
    updateNewPostText: (text) => {
      dispatch(updateNewPostTextAC(text))
    }
  }
}

export const PostSectionContainer = connect(mapStateToProps, mapDispatchToProps)(PostSection)