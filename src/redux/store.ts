import { v1 } from "uuid"
import { dialogsReducer } from "./dialogs-reducer"
import { messageContactsReducer } from "./message-contacts-reducer"
import { profileReducer } from "./profile-reducer"
import { userReducer } from "./user-reducer"

export type CallSubscriberType = (state: StateType) => void

export type ContactType = {
  id: number
  name: string
}

type DialogItemType = {
  id: string
  name: string
  message: string
}

type MessageContactsType = Array<{id: number, name: string}>
type UserType = {id: number, name: string}

type DialogType = {
  [key: string]: DialogItemType[],
}

type DialogPageType = {
  currentMessageText: string
  dialogs: DialogType
}

type ActionType = any

type PostType = {
  id: string
  name:  string
  message: string
  likes: number
}

type ProfilePageType = {
  currentText: string
  posts: PostType[]
}

type StateType = {
  profilePage: ProfilePageType ,
  dialogsPage: {
    messageContacts: ContactType[],
    currentMessageText: string
    dialogs: DialogType
  }
}

type StoreType = {
  _callSubscriber: (state: StateType) => void,
  user: UserType,
  _state: {
    messageContacts: ContactType[],
    profilePage:{
      currentText: string
      posts: PostType[]
    },
    dialogsPage: {
      currentMessageText: string
      dialogs: DialogType
    }
  }
  getState: () => void,
  addMessageToDialog: () => void
  addPost: () => void
  updateNewPostText: (text: string) => void
  updateNewMessageText: (text: string) => void
}

const messageContacts: MessageContactsType = [
  /* {id: 0, name:'Fluffy Gangster'}, */
  { id: 1, name: 'Missis Marple' },
  { id: 2, name: 'Luna' },
  { id: 3, name: 'Toby' },
  { id: 4, name: 'Cleo' },
  { id: 5, name: 'Choupette' },
  { id: 6, name: 'Pumpkine' },
]


const user: UserType =  { id: 0, name: 'Fluffy Gangster' }

let store = {
  user: user,

  _state: {
    profilePage: {
      currentText: '',
      posts: [
        {
          id: v1(),
          /* name: store._state.messageContacts[0].name, */
          name: 'Fluffy Gangster',
          message: `Paws up, it's time for another purr-fect day!`,
          likes: 21,
        },
        {
          id: v1(),
          name: 'Fluffy Gangster',
          message: `Just caught a toy mouse 🐭 and feeling like a true hunter! 😼`,
          likes: 7,
        },
        {
          id: v1(),
          name: 'Fluffy Gangster',
          message: `Is it dinner time yet? I'm feline pretty hungry. 🍽️`,
          likes: 12,
        },
      ],
    },
    dialogsPage: {
      messageContacts: [
        { id: 0, name:'Fluffy Gangster'},
        { id: 1, name: 'Missis Marple' },
        { id: 2, name: 'Luna' },
        { id: 3, name: 'Toby' },
        { id: 4, name: 'Cleo' },
        { id: 5, name: 'Choupette' },
        { id: 6, name: 'Pumpkine' },
      ],
      currentMessageText: '',
      dialogs: {
        [1]: [
          {
            id: v1(),
            name: 'Missis Marple',
            message: `Hi, how's it going today?`,
          },
          {
            id:  v1(),
            name: 'Fluffy Gangster',
            message: `Hey there! Just napping as usual. You?`,
          },
          {
            id:  v1(),
            name: 'Missis Marple',
            message: `Same here, napping is our superpower. 😴`,
          },
          {
            id:  v1(),
            name: 'Fluffy Gangster',
            message: `Absolutely! But don't forget the occasional playtime.`,
          },
          {
            id:  v1(),
            name: 'Missis Marple',
            message: `You're right, chasing feather toys is a must! 🐾`,
          },
          {
            id:  v1(),
            name: 'Missis Marple',
            message: `Need to rest`,
          },
        ],
        [2]: [
          {
            id:  v1(),
            name: 'Luna',
            message: `Hey there!`,
          },
          {
            id:  v1(),
            name: 'Fluffy Gangster',
            message: `Meow! How are you doing?`,
          },
          {
            id:  v1(),
            name: 'Luna',
            message: `I'm good, thanks! How about you?`,
          },
          {
            id:  v1(),
            name: 'Fluffy Gangster',
            message: `Purr purr... Just enjoying the day!`,
          },
        ],
      },
    }
  },
  _callSubscriber(state: StateType) {
    console.log('Render')
  },

  getState() {
    return this._state;
  },
  subscribe(observer: CallSubscriberType) {
    this._callSubscriber = observer; //observer pattern
  },

  addMessageToDialog() {
    const newMessage = {
      id: v1(),
      name: user.name,
      message: this._state.dialogsPage.currentMessageText
    }

    //неправильный вариант - мутабельный

    this._state.dialogsPage.dialogs[1].push(newMessage);
    this._state.dialogsPage.currentMessageText = '';
    this._callSubscriber(this._state);
  },

  addPost() {
    const newPost = {
      id: v1(),
      name: messageContacts[0].name,
      message: this._state.profilePage.currentText,
      likes: 0
    }
    //неправильный вариант - мутабельный
    this._state.profilePage.posts.unshift(newPost);
    this._state.profilePage.currentText = '';
    this._callSubscriber(this._state);
  },

  updateNewPostText(newText: string) {
    this._state.profilePage.currentText = newText;
    this._callSubscriber(this._state);
  },

  updateNewMessageText(newText: string) {
    this._state.dialogsPage.currentMessageText = newText;
    this._callSubscriber(this._state);
  },
  dispatch(action: ActionType) {

    profileReducer(this._state.profilePage, action);
    dialogsReducer(this._state.dialogsPage, action);
    userReducer(this.user, action);
    messageContactsReducer(this._state.dialogsPage.messageContacts, action);
    this._callSubscriber(this._state);

  }
}
