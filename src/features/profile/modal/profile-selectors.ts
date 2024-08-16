import { AppRootStateType } from "@/redux/redux-store";

export const getProfile = (state: AppRootStateType) => state.profilePage.profile
export const getStatus = (state: AppRootStateType) => state.profilePage.status
