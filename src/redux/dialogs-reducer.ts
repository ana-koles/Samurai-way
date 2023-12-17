export type DialogItemType = {
  id: number
  name: string
  message: string
}

export type DialogType = {
  [key: string]: DialogItemType[],
}

export type DialogPageType = {
  currentMessageText: string
  dialogs: DialogType
}

const ADD_MESSAGE_TO_DIALOG = 'ADD-MESSAGE-TO-DIALOG';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

type UpdateNewMessageTextAT = ReturnType<typeof updateNewMessageTextAC>;
type AddMessageToDialogAT = ReturnType<typeof addMessageToDialogAC>;
export type DialogReducerActionType = UpdateNewMessageTextAT | AddMessageToDialogAT;

let dialogsInitialState:DialogPageType = {
  currentMessageText: '',
  dialogs: {
    [1]: [
      {
        id: 11,
        name: 'Missis Marple',
        message: `Hi, how's it going today?`,
      },
      {
        id: 12,
        name: 'Fluffy Gangster',
        message: `Hey there! Just napping as usual. You?`,
      },
      {
        id: 13,
        name: 'Missis Marple',
        message: `Same here, napping is our superpower. 😴`,
      },
      {
        id: 14,
        name: 'Fluffy Gangster',
        message: `Absolutely! But don't forget the occasional playtime.`,
      },
      {
        id: 15,
        name: 'Missis Marple',
        message: `You're right, chasing feather toys is a must! 🐾`,
      },
      {
        id: 16,
        name: 'Missis Marple',
        message: `Need to rest`,
      },
    ],
    [2]: [
      {
        id: 21,
        name: 'Luna',
        message: `Hey there!`,
      },
      {
        id: 22,
        name: 'Fluffy Gangster',
        message: `Meow! How are you doing?`,
      },
      {
        id: 23,
        name: 'Luna',
        message: `I'm good, thanks! How about you?`,
      },
      {
        id: 24,
        name: 'Fluffy Gangster',
        message: `Purr purr... Just enjoying the day!`,
      },
    ],
  },
}

export const dialogsReducer = (state: DialogPageType = dialogsInitialState, action: DialogReducerActionType) => {
  switch(action.type) {
    case ADD_MESSAGE_TO_DIALOG:
      debugger;
      const newMessage = {
        id: action.userId + 1 + Math.random(),
        name: 'Fluffy Gangster',
        message: state.currentMessageText
      }
      console.log(state.dialogs[action.userId]);
      state.dialogs[action.userId + 1].push(newMessage);
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