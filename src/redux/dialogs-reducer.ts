import { DialogPageType, DialogType } from "./state";

const ADD_MESSAGE_TO_DIALOG = 'ADD-MESSAGE-TO-DIALOG';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

type UpdateNewMessageTextAT = ReturnType<typeof updateNewMessageTextAC>;
type AddMessageToDialogAT = ReturnType<typeof addMessageToDialogAC>;
export type DialogReducerActionType = UpdateNewMessageTextAT | AddMessageToDialogAT;

export const dialogsReducer = (state: DialogPageType, action: DialogReducerActionType) => {

  switch(action.type) {
    case ADD_MESSAGE_TO_DIALOG:
      const newMessage = {
        id: action.userId + Math.random(),
        name: action.userName,
        message: state.currentMessageText
      }
      console.log(state.dialogs[action.userId]);
      state.dialogs[action.userId].push(newMessage);
      state.currentMessageText = '';
      return state;

    case UPDATE_NEW_MESSAGE_TEXT:
      if (action.newText) {
        state.currentMessageText = action.newText;
      };
      return state;

    default:
      return state
  }
}

export const updateNewMessageTextAC = (text: string) => ({type: 'UPDATE-NEW-MESSAGE-TEXT', newText: text } as const)
export const addMessageToDialogAC = (userId: number, userName: string) => {
  return {
    type: 'ADD-MESSAGE-TO-DIALOG',
    userId,
    userName
  } as const
}