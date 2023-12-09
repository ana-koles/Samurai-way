import { ProfilePageType } from "./state";

const ADD_POST = 'ADD-POST' as const;
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT' as const;

type AddPostAT = ReturnType<typeof addPostAC>
type UpdateNewPostTextAT = ReturnType<typeof updateNewPostTextAC>
export type ProfileReducerActionType = AddPostAT | UpdateNewPostTextAT;

export const profileReducer = (state: ProfilePageType, action: ProfileReducerActionType) => {

  switch(action.type) {
    case ADD_POST:
      const newPost = {
        id: Date.now() * Math.random(),
        name: action.userName,
        message: state.currentText,
        likes: 0
      }

      state.posts.unshift(newPost);
      state.currentText = '';
      return state;

      case UPDATE_NEW_POST_TEXT:
        if (action.newText) {
          state.currentText = action.newText;
        };
        return state;

      default:
        return state;
  }
}

export const addPostAC = (name: string) => ({type: ADD_POST, userName: name} as const);
export const updateNewPostTextAC = (text: string) => ({type: UPDATE_NEW_POST_TEXT, newText: text} as const)