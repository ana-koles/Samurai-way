import { AppRootStateType } from "@/redux/redux-store";

export const selectMessages = (state: AppRootStateType) => {
  return state.chat?.messages
}