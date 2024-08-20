import { AppRootStateType } from "@/redux/redux-store";

export const selectLogin = (state: AppRootStateType) => {
  return state.auth.login
}

export const selectIsAuth = (state: AppRootStateType) => {
  return state.auth.isAuth
}