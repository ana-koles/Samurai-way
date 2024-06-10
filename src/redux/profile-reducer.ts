import { Dispatch } from "redux"
import { v1 } from "uuid"
import { profileApi } from "../api/api"
import { stopSubmit } from "redux-form"

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
  updateStatusSuccessful: boolean
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
const SET_UPDATE_STATUS_SUCCESSFUL = 'SET_UPDATE_STATUS_SUCCESSFUL' as const
//types
type AddPostAT = ReturnType<typeof addPostAC>;
type SetProfileAT = ReturnType<typeof setProfileAC>;
type SetStatusAT = ReturnType<typeof setStatusAC>;
type SetpRrofilePhotoAT = ReturnType<typeof setProfilePhotoAC>
type SetUpdateStatusSuccessfulAT = ReturnType<typeof setUpdateStatusSuccessfulAC>
export type ProfileReducerActionType = AddPostAT | SetProfileAT | SetStatusAT | SetpRrofilePhotoAT | SetUpdateStatusSuccessfulAT;



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
  status: '',
  updateStatusSuccessful: true
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

    case SET_UPDATE_STATUS_SUCCESSFUL: {
      return {...state, updateStatusSuccessful: action.updateStatusSuccessful}
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
export const setUpdateStatusSuccessfulAC = (updateStatusSuccessful: boolean) => ({type: SET_UPDATE_STATUS_SUCCESSFUL, updateStatusSuccessful})

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
  const userId = getState().auth.userId;
  try {
    let res = await profileApi.updateUserData(userData);
    if (res.data.resultCode === 0) {
      let res = await profileApi.getProfileData(userId)
      await dispatch(setUpdateStatusSuccessfulAC(true))
      dispatch(setProfileAC(res.data));
      return true
    } else {
      dispatch(setUpdateStatusSuccessfulAC(false))
      let message = res.data.messages.length > 0 ? res.data.messages[0] : 'Common Error'
    /*   let action = stopSubmit('profile', {_error: message});  *///экшен который предоставляет redux-form, чтобы обрабатывать ошибки.
                                                          //указываем название формы и общую ошибку или название конкретного поля, для к-го обрабатываем ошибку
      let start = message.indexOf('->');
      let end = message.indexOf(')')
      let field = message.slice(start + 2, end);
      let fieldToDisplay = field.charAt(0).toLowerCase() + field.slice(1)
      let errors: Error = {
        contacts: {}
      }
      errors.contacts[fieldToDisplay] = message;
      let action = stopSubmit('profile', errors);
      dispatch(action);
/*       throw new Error(message); */
    }
  }
  catch (error: any) {
    console.log(error.message)
    throw error;
  }
}


type Error = {
  contacts: {
    [key: string]: string
  }
}
