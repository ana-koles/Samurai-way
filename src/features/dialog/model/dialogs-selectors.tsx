import { AppRootStateType } from "@/redux/redux-store";

export const selectDialogs = (state: AppRootStateType) => {
  return state.dialogsPage.dialogs
}