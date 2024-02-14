import { Dispatch } from "redux";
import { LoginDataType, authApi } from "./api";
import { LoginFormPropsType } from "../components/login/Login";
import { ThunkAction } from "redux-thunk";
import { AppThunk } from "./redux-store";
import { stopSubmit } from "redux-form";

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';


let initialState: InitialStateType = {
  userId: null,
  email: null,
  login: null,
  isAuth: false
}

type InitialStateType = {
  userId: null | number,
  email: null | string,
  login: null | string,
  isAuth: boolean
}

type SetAuthUserDataAT = ReturnType<typeof setAuthUserData>;
type AuthActionType = SetAuthUserDataAT

export const authReducer = (state: InitialStateType = initialState, action: AuthActionType): InitialStateType => {

  switch(action.type) {
    case SET_AUTH_USER_DATA: {
        return {...state, ...action.payload};
    }

    default:
      return state
  }
}

//actions
export const setAuthUserData = (userId: number | null, email: string|null, login: string|null, isAuth: boolean) => {
  return {type: SET_AUTH_USER_DATA, payload: {
    userId,
    email,
    login,
    isAuth
  }} as const
}


//thunk
export const getAuthUserDataTC = () => (dispatch: Dispatch) => { //get users authentification  data
  return authApi.getMeAuth() //чтобы подписаться на промис из этого диспача в app-reducer
    .then(response => {
      if (response.data.resultCode === 0) { //юзер залогинен
        let {id, email, login} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
  }})
}

export const loginTC = (email: string, password: string, rememberMe: boolean): AppThunk => (dispatch) => {
  authApi.login(email, password, rememberMe)
    .then(data => {
      if (data.resultCode === 0) { //authentification in the service is successed
        dispatch(getAuthUserDataTC());

      } else {
          let message = data.messages.length > 0 ? data.messages[0] : 'Common Error'
          let action = stopSubmit('login', {_error: message}); //экшен который предоставляет redux-form, чтобы обрабатывать ошибки.
                                                                  //указываем название формы и общую ошибку или название коркретного поля, для к-го обрабатываем ошибку
          dispatch(action);
      }
    })
    .catch((error: Error) => {
      console.log(error.message)
    })
}

export const logoutTC = () => (dispatch: Dispatch) => {
  authApi.logout()
    .then(response => {
      if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false)); //надо убить все куки
      } else {
        console.log(response)
      }
    })
    .catch((error: Error) => {
      console.log(error.message)
    })
}