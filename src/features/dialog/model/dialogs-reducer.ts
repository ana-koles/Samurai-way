import { v1 } from "uuid"

export type DialogItemType = {
  id: string
  name: string
  message: string
}

export type DialogType = {
  [key: string]: DialogItemType[],
}

type MessageContactsType = Array<{id: number, name: string}>

export type DialogPageType = {
  messageContacts: MessageContactsType
  dialogs: DialogType
}

const ADD_MESSAGE_TO_DIALOG = 'ADD-MESSAGE-TO-DIALOG';

type AddMessageToDialogAT = ReturnType<typeof addMessageToDialogAC>;
export type DialogReducerActionType =  AddMessageToDialogAT;

let dialogsInitialState: DialogPageType = {
  messageContacts: [
    { id: 1, name: 'Missis Marple' },
    { id: 2, name: 'Luna' },
    { id: 3, name: 'Toby' },
    { id: 4, name: 'Cleo' },
    { id: 5, name: 'Choupette' },
    { id: 6, name: 'Pumpkine' },
  ],
  dialogs: {
    [1]: [
      {
        id: v1(),
        name: 'Missis Marple',
        message: `Hi, how's it going today?`,
      },
      {
        id: v1(),
        name: 'Fluffy Gangster',
        message: `Hey there! Just napping as usual. You?`,
      },
      {
        id: v1(),
        name: 'Missis Marple',
        message: `Same here, napping is our superpower. 😴`,
      },
      {
        id: v1(),
        name: 'Fluffy Gangster',
        message: `Absolutely! But don't forget the occasional playtime.`,
      },
      {
        id: v1(),
        name: 'Missis Marple',
        message: `You're right, chasing feather toys is a must! 🐾`,
      },
      {
        id: v1(),
        name: 'Missis Marple',
        message: `Need to rest`,
      },
    ],
    [2]: [
      {
        id: v1(),
        name: 'Luna',
        message: `Hey there!`,
      },
      {
        id: v1(),
        name: 'Fluffy Gangster',
        message: `Meow! How are you doing?`,
      },
      {
        id: v1(),
        name: 'Luna',
        message: `I'm good, thanks! How about you?`,
      },
      {
        id: v1(),
        name: 'Fluffy Gangster',
        message: `Purr purr... Just enjoying the day!`,
      },
    ],
  },
}

export const dialogsReducer = (state: DialogPageType = dialogsInitialState, action: DialogReducerActionType): DialogPageType => {
  switch(action.type) {
    case ADD_MESSAGE_TO_DIALOG:
      const newMessage = {
        id: v1(),
        name: 'Fluffy Gangster',
        message: action.newMessage
      }
      let copyState = {...state, currentMessageText: '', dialogs: {...state.dialogs, [action.userId + 1]: [...state.dialogs[action.userId + 1], newMessage]}}
      return copyState;

    default:
      return state
  }
}

export const addMessageToDialogAC = (userId: number, userName: string, newMessage: string) => {
  return {
    type: 'ADD-MESSAGE-TO-DIALOG',
    userId,
    userName,
    newMessage
  } as const
}