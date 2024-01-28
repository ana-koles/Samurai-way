import { Dispatch } from "redux";
import { authApi } from "./api";

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';

let initialState: InitialStateType = {
  id: null,
  email: null,
  login: null,
  isAuth: false
}

type InitialStateType = {
  id: null | number,
  email: null | string,
  login: null | string,
  isAuth: boolean
}

type SetAuthUserDataAT = ReturnType<typeof setAuthUserData>;
type AuthActionType = SetAuthUserDataAT

export const authReducer = (state: InitialStateType = initialState, action: AuthActionType): InitialStateType => {

  switch(action.type) {
    case SET_AUTH_USER_DATA: {
      return {...state, ...action.payload, isAuth: true};
    }
    default:
      return state
  }
}

//actions
export const setAuthUserData = (userId: number | null, email: string|null, login: string|null) => {
  return {type: SET_AUTH_USER_DATA, payload: {
    userId,
    email,
    login
  }} as const
}

//thunk
export const getAuthUserDataTC = () => (dispatch: Dispatch) => {
  authApi.getMeAuth()
    .then(data => {
      if (data.resultCode === 0) {
        let {id, email, login} = data.data;
        dispatch(setAuthUserData(id, email, login));
      }
    })
}