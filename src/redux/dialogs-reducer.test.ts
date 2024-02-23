import { v1 } from "uuid"
import { DialogPageType, addMessageToDialogAC, dialogsReducer } from "./dialogs-reducer"

let dialogsInitialState: DialogPageType = {
  messageContacts: [],
  dialogs: {}
};

beforeEach(() => {
  dialogsInitialState = {
    messageContacts: [
      /* {id: 0, name:'Fluffy Gangster'}, */
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
})


it('dialog message should be added correctly', () => {
  let action = addMessageToDialogAC(0, 'Benny', 'Hello!' );
  const newState = dialogsReducer(dialogsInitialState, action);

  expect(newState.dialogs[1].length).toBe(7);
  expect(newState.dialogs[1][6].name).not.toBe('Benny')

})