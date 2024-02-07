import { Dispatch } from "redux"
import { v1 } from "uuid"
import { profileApi } from "./api"

export type PostType = {
  id: string
  name:  string
  message: string
  likes: number
}

export type ProfilePageType = {
  currentText: string
  posts: PostType[]
  profile: UserProfileType | null
  status: string
}

type ContactsType = {
  facebook: string | null
  website: string | null
  vk: string | null
  twitter: string | null
  instagram: string | null
  youtube: string | null
  github: string | null
  mainLink: string | null
};

type PhotosType = {
  small: string | null
  large: string | null
};

export type UserProfileType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string | null
  fullName: string
  contacts: ContactsType
  photos: PhotosType
  aboutMe?: string
};

const ADD_POST = 'ADD-POST' as const;
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT' as const;
const SET_PROFILE = 'SET_PROFILE'as const;
const SET_STATUS = 'SET_STATUS' as const

//types
type AddPostAT = ReturnType<typeof addPostAC>;
type UpdateNewPostTextAT = ReturnType<typeof updateNewPostTextAC>;
type SetProfileAT = ReturnType<typeof setProfileAC>;
type SetStatusAT = ReturnType<typeof setStatusAC>
export type ProfileReducerActionType = AddPostAT | UpdateNewPostTextAT | SetProfileAT | SetStatusAT;



let profileInitialState: ProfilePageType = {
  currentText: '',
  posts: [
    {
      id: v1(),
      /* name: store._state.messageContacts[0].name, */
      name: 'Fluffy Gangster',
      message: `Paws up, it's time for another purr-fect day!`,
      likes: 21,
    },
    {
      id: v1(),
      name: 'Fluffy Gangster',
      message: `Just caught a toy mouse 🐭 and feeling like a true hunter! 😼`,
      likes: 7,
    },
    {
      id: v1(),
      name: 'Fluffy Gangster',
      message: `Is it dinner time yet? I'm feline pretty hungry. 🍽️`,
      likes: 12,
    },
  ],
  profile: null,
  status: ''
}

export const profileReducer = (state: ProfilePageType = profileInitialState , action: ProfileReducerActionType): ProfilePageType => {

  switch(action.type) {

    case SET_PROFILE: {
      return {...state, profile: action.user}
    }
    case ADD_POST:
      const newPost = {
        id: v1(),
        name: action.userName,
        message: state.currentText,
        likes: 0
      }
      let copyState = {...state, posts: [newPost, ...state.posts], currentText: ''};
      return copyState;

    case UPDATE_NEW_POST_TEXT:
      return {...state, currentText: action.newText};

    case SET_STATUS:
      return {...state, status: action.status};

    default:
      return state;
  }
}

//actions
export const addPostAC = (name: string) => ({type: ADD_POST, userName: name} as const);
export const updateNewPostTextAC = (text: string) => ({type: UPDATE_NEW_POST_TEXT, newText: text} as const);
export const setProfileAC = (user: UserProfileType) => ({type: SET_PROFILE, user})
export const setStatusAC = (status: string) => ({type: SET_STATUS, status})


//thunk
export const setProfileTC = (userId: number) => (dispatch: Dispatch) => {
  profileApi.getProfileData(userId)
  .then((res) => dispatch(setProfileAC(res.data)))
}

export const setStatusTC = (userId: number) => (dispatch: Dispatch) => {
  profileApi.getStatus(userId)
  .then((res) => dispatch(setStatusAC(res.data)))
}

export const updateStatusTC = (status: string) => (dispatch: Dispatch) => {
  profileApi.updateStatus(status)
  .then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(setStatusAC(status))
    } else {
      console.log(res)
    }
  })
}

