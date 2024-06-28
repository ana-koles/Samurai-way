import {
  PostType,
  ProfileReducerActionType,
  addPostAC,
} from "../../modal/profile-reducer";
import { connect } from "react-redux";
import { AppRootStateType } from "../../../../redux/redux-store";
import { Dispatch } from "redux";
import { PostSection } from "./PostSection";


type MapStateToPropsType = {
  posts: PostType[];
};

type MapDispatchToPropsType = {
  addPost: (name: string, message: string) => void;
};

export type PostSectionPropsType = MapStateToPropsType & MapDispatchToPropsType;

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
  return {
    posts: state.profilePage.posts,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<ProfileReducerActionType>
): MapDispatchToPropsType => {
  return {
    addPost: (name: string, message: string) => {
      dispatch(addPostAC(name, message));
    },
  };
};

export const PostSectionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostSection);
