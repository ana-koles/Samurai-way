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
  posts: PostType[]
  profile: UserProfileType | null
  status: string
}

export type ContactsType = {
  facebook: string | null
  website: string | null
  vk: string | null
  twitter: string | null
  instagram: string | null
  youtube: string | null
  github: string | null
  mainLink: string | null
};

export type PhotosType = {
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
  aboutMe: string | null
};

export type UserUpdatedProfileType = Omit<UserProfileType, 'photos'>

const ADD_POST = 'ADD-POST' as const;
const SET_PROFILE = 'SET_PROFILE'as const;
const SET_STATUS = 'SET_STATUS' as const;
const SET_PROFILE_PHOTO = 'SET_PROFILE_PHOTO' as const
const UPDATE_PROFILE_DATA = 'UPDATE_PROFILE_DATA' as const

//types
type AddPostAT = ReturnType<typeof addPostAC>;
type SetProfileAT = ReturnType<typeof setProfileAC>;
type SetStatusAT = ReturnType<typeof setStatusAC>;
type SetpRrofilePhotoAT = ReturnType<typeof setProfilePhotoAC>
type UpdateUserDataAT = ReturnType<typeof updateProfileAC>
export type ProfileReducerActionType = AddPostAT | SetProfileAT | SetStatusAT | SetpRrofilePhotoAT | UpdateUserDataAT;



let profileInitialState: ProfilePageType = {
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
        message: action.newMessage,
        likes: 0
      }
      let copyState = {...state, posts: [newPost, ...state.posts], currentText: ''};
      return copyState;

    case SET_STATUS:
      return {...state, status: action.status};

    case SET_PROFILE_PHOTO:{
      let copyState1 = {
        ...state,
        profile: state.profile? {
          ...state.profile,
          photos: {
            ...state.profile?.photos,
            ...action.photos
          }
        }: state.profile
      };
      return copyState1;
    }

    case UPDATE_PROFILE_DATA: {
      return {
        ...state,
        profile: {
          ...action.userData,
          photos: state.profile?.photos ?? {small: null, large: null}
        }
      }
    }

    default:
      return state;
  }
}

//actions
export const addPostAC = (name: string, newMessage: string) => ({type: ADD_POST, userName: name, newMessage} as const);
export const setProfileAC = (user: UserProfileType) => ({type: SET_PROFILE, user})
export const setStatusAC = (status: string) => ({type: SET_STATUS, status});
export const setProfilePhotoAC = (photoFile: PhotosType) => ({type: SET_PROFILE_PHOTO, photos: photoFile})
export const updateProfileAC = (userData: UserUpdatedProfileType) => ({type: UPDATE_PROFILE_DATA, userData})


//thunk
export const setProfileTC = (userId: number) => async(dispatch: Dispatch) => {
  try {
    let res = await  profileApi.getProfileData(userId)
    dispatch(setProfileAC(res.data))
  } catch (error: any) {
    console.log(error.message)
  }
}

export const setStatusTC = (userId: number) => async(dispatch: Dispatch) => {
  try {
    let res = await profileApi.getStatus(userId)
    dispatch(setStatusAC(res.data))
  } catch  (error: any) {
    console.log(error.message)
  }
}

export const updateStatusTC = (status: string) => async(dispatch: Dispatch) => {
  try {
    let res = await profileApi.updateStatus(status)
    if (res.data.resultCode === 0) {
      dispatch(setStatusAC(status))
    } else {
      console.log(res)
    }
  } catch (error: any) {
    console.log(error.message)
  }
}

export const savePhotoTC = (photoFile: File) => async(dispatch: Dispatch) => {
  try {
    let res = await profileApi.savePhoto(photoFile);
    if (res.data.resultCode === 0) {
      dispatch(setProfilePhotoAC(res.data.data.photos))
    }
  } catch (error: any) {
    console.log(error.message)
  }
}

export const updateProfileTC = (userData:UserUpdatedProfileType) => async(dispatch: Dispatch, getState: any) => {
  const userId = getState().auth.userId
  try {
    let res = await profileApi.updateUserData(userData);
    if (res.data.resultCode === 0) {
      let res = await  profileApi.getProfileData(userId)
      dispatch(setProfileAC(res.data))
    }
  }
  catch (error: any) {
    console.log(error.message)
  }
}

