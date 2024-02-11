import { Dispatch } from "redux";
import { LoginDataType, authApi } from "./api";
import { LoginFormPropsType } from "../components/login/Login";

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

let initialState: InitialStateType = {
  id: null,
  email: null,
  login: null,
  isAuth: true
}

type InitialStateType = {
  id: null | number,
  email: null | string,
  login: null | string,
  isAuth: boolean
}

type SetAuthUserDataAT = ReturnType<typeof setAuthUserData>;
type LoginAT = ReturnType<typeof loginAC>
type AuthActionType = SetAuthUserDataAT | LoginAT

export const authReducer = (state: InitialStateType = initialState, action: AuthActionType): InitialStateType => {

  switch(action.type) {
    case SET_AUTH_USER_DATA: {
      return {...state, ...action.payload, isAuth: true};
    }

    case LOGIN: {
      return {...state, isAuth: action.payload.isLogin};
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

const loginAC = (isLogin: boolean) => {
  return  {type: LOGIN, payload: {isLogin}} as const
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

export const loginTC = (data: LoginDataType) => (dispatch: Dispatch) => {
  debugger;
  authApi.login(data)
    .then(response => {
      if (response.data.resultCode === 0) {
        dispatch(loginAC(true))
      } else {
        console.log(response)
      }
    })
    .catch((error: Error) => {
      console.log(error.message)
    })
}