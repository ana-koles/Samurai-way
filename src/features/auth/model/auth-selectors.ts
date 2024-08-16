import { AppRootStateType } from "@/redux/redux-store";

export const getAuthorizedUserId = (state: AppRootStateType) => state.auth.userId