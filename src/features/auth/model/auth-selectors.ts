import { AppRootStateType } from "@/redux/redux-store";

export const selectAuthorizedUserId = (state: AppRootStateType) => state.auth.userId
export const selectIsAuth = (state: AppRootStateType) => state.auth.isAuth
export const selectLogin = (state: AppRootStateType) => state.auth.login