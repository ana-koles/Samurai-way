import { AppRootStateType } from "@/redux/redux-store";

export const getAuthorizedUserId = (state: AppRootStateType) => state.auth.userId
export const getIsAuth = (state: AppRootStateType) => state.auth.isAuth