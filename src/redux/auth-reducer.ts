import { Dispatch } from "redux";
import { authApi, securityAPI } from "./api";
import { AppThunk } from "./redux-store";
import { stopSubmit } from "redux-form";

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';
const GET_CAPTCHA_URL = 'GET_CAPTCHA_URL';


let initialState: InitialStateType = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null // if null,  then catcha is not required
}

type InitialStateType = {
  userId: null | number,
  email: null | string,
  login: null | string,
  isAuth: boolean;
  captchaUrl: null | string;
}

type SetAuthUserDataAT = ReturnType<typeof setAuthUserData>;
type GetCaptchaUrlSuccessAT = ReturnType<typeof getCatchaUrlSuccess>
type AuthActionType = SetAuthUserDataAT | GetCaptchaUrlSuccessAT

export const authReducer = (state: InitialStateType = initialState, action: AuthActionType): InitialStateType => {

  switch(action.type) {
    case SET_AUTH_USER_DATA:
    case GET_CAPTCHA_URL:{
      debugger
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

export const getCatchaUrlSuccess = (captchaUrl: string) => {
  return {type: GET_CAPTCHA_URL, payload: {
    captchaUrl
  }}
}

//thunk
export const getAuthUserDataTC = () => (dispatch: Dispatch) => { //get users authentification  data
  debugger
  return authApi.getMeAuth() //чтобы подписаться на промис из этого диспача в app-reducer
    .then(response => {
      if (response.data.resultCode === 0) { //юзер залогинен
        let {id, email, login} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
  }})
}

export const loginTC = (email: string, password: string, rememberMe: boolean): AppThunk => async(dispatch) => {
  try {
    let data = await authApi.login(email, password, rememberMe)
    if (data.resultCode === 0) { //authentification in the service is successed => get auth data
      dispatch(getCatchaUrl())
      //dispatch(getAuthUserDataTC()); //catcha is not required
      debugger


    } else {
      if (data.resultCode === 10) {
        dispatch(getCatchaUrl())
      } else {
        let message = data.messages.length > 0 ? data.messages[0] : 'Common Error'
        let action = stopSubmit('login', {_error: message}); //экшен который предоставляет redux-form, чтобы обрабатывать ошибки.
                                                            //указываем название формы и общую ошибку или название конкретного поля, для к-го обрабатываем ошибку
        dispatch(action);
      }
    }
  } catch (error: any) {
    console.log(error.message)
  }
}

export const logoutTC = () => async (dispatch: Dispatch) => {
  try {
    let response = await authApi.logout()
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false)); //надо убить все куки
    } else {
      console.log(response)
    }
  } catch (error: any) { //error: Error
    console.log(error.message)
  }
}

export const getCatchaUrl = () => async(dispatch: Dispatch) => {
  try {
    let res = await securityAPI.getCatchaAPI();
    const captchaUrl = res.data.url;
    dispatch(getCatchaUrlSuccess(captchaUrl))
  }
  catch (error: any) {
    console.log(error)
  }


}