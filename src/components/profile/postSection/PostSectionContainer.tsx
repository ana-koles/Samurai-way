import React from 'react';
import s from './PostSection.module.css'
import { PostType, ProfileReducerActionType, addPostAC } from '../../../redux/profile-reducer';
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
}

type MapDispatchToPropsType = {
  addPost: (name: string, message: string) => void
}

export type PostSectionPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
  return {
    posts: state.profilePage.posts,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ProfileReducerActionType>): MapDispatchToPropsType => {
  return {
    addPost: (name: string, message: string) => {
      dispatch(addPostAC(name, message))
    },
  }
}

export const PostSectionContainer = connect(mapStateToProps, mapDispatchToProps)(PostSection)