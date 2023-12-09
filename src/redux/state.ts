import { dialogsReducer } from "./dialogs-reducer"
import { messageContactsReducer } from "./message-contacts-reducer"
import { profileReducer } from "./profile-reducer"
import { userReducer } from "./user-reducer"

export type CallSubscriberType = (state: StateType) => void

export type ContactType = {
  id: number
  name: string
}

export type DialogItemType = {
  id: number
  name: string
  message: string
}

export type MessageContactsType = Array<{id: number, name: string}>
export type UserType = {id: number, name: string}

export type DialogType = {
  [key: string]: DialogItemType[],
}

export type DialogPageType = {
  currentMessageText: string
  dialogs: DialogType
}

export type ActionType = any

export type PostType = {
  id: number
  name:  string
  message: string
  likes: number
}

export type ProfilePageType = {
  currentText: string
  posts: PostType[]
}

export type StateType = {
  profilePage: ProfilePageType ,
  dialogsPage: {
    currentMessageText: string
    dialogs: DialogType
  }
}

export type StoreType = {
  _callSubscriber: (state: StateType) => void,
  user: UserType,
  messageContacts: ContactType[],
  _state: {
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

export let store = {
  user: user,
  messageContacts: messageContacts,
  _state: {
    profilePage: {
      currentText: '',
      posts: [
        {
          id: Date.now() * Math.random(),
          name: messageContacts[0].name,
          message: `Paws up, it's time for another purr-fect day!`,
          likes: 21
        },
        {
          id: Date.now() * Math.random(),
          name:  messageContacts[0].name,
          message: `Just caught a toy mouse 🐭 and feeling like a true hunter! 😼`,
          likes: 7
        },
        {
          id: Date.now() * Math.random(),
          name:  messageContacts[0].name,
          message: `Is it dinner time yet? I'm feline pretty hungry. 🍽️`,
          likes: 12
        },
      ]
    },
    dialogsPage: {
      currentMessageText: '',
      dialogs: {
        [messageContacts[0].id]: [
          {
            id: Number(messageContacts[0].id + 1),
            name:  messageContacts[0].name,
            message: `Hi, how's it going today?`,
          },
          {
            id: 12,
            name:  user.name,
            message: ` Hey there! Just napping as usual. You?`,
          },
          {
            id: 13,
            name:  messageContacts[0].name,
            message: `Same here, napping is our superpower. 😴`,
          },
          {
            id: 14,
            name:  user.name,
            message: `Absolutely! But don't forget the occasional playtime.`,
          },
          {
            id: 15,
            name:  messageContacts[0].name,
            message: `You're right, chasing feather toys is a must! 🐾`,
          },
          {
            id: 16,
            name:  messageContacts[0].name,
            message: `Need to rest`,
          },
        ],
        [messageContacts[1].id]: [
          {
            id: 21,
            name:  messageContacts[1].name,
            message: `Hey there!`,
          },
          {
            id: 22,
            name:  user.name,
            message: `Meow! How are you doing?`,
          },
          {
            id: 23,
            name:  messageContacts[1].name,
            message: `I'm good, thanks! How about you?`,
          },
          {
            id: 24,
            name:  user.name,
            message: `Purr purr... Just enjoying the day!`,
          },
        ]
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
      id: messageContacts[0].id + Math.random(),
      name: user.name,
      message: this._state.dialogsPage.currentMessageText
    }

    //неправильный вариант - мутабельный

    this._state.dialogsPage.dialogs[messageContacts[0].id].push(newMessage);
    this._state.dialogsPage.currentMessageText = '';
    this._callSubscriber(this._state);
  },

  addPost() {
    const newPost = {
      id: Date.now() * Math.random(),
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
    messageContactsReducer(this.messageContacts, action);
    this._callSubscriber(this._state);

/*
    if(action.type === 'ADD-MESSAGE-TO-DIALOG'){
      const newMessage = {
        id: messageContacts[0].id + Math.random(),
        name: user.name,
        message: this._state.dialogsPage.currentMessageText
      }


      this._state.dialogsPage.dialogs[messageContacts[0].id].push(newMessage);
      this._state.dialogsPage.currentMessageText = '';
      this._callSubscriber(this._state);

    } else if(action.type === 'ADD-POST'){
      const newPost = {
        id: Date.now() * Math.random(),
        name: user.name,
        message: this._state.profilePage.currentText,
        likes: 0
      }

      this._state.profilePage.posts.unshift(newPost);
      this._state.profilePage.currentText = '';
      this._callSubscriber(this._state);

    } else if(action.type === 'UPDATE-NEW-POST-TEXT') {
      if (action.newText) {
        this._state.profilePage.currentText = action.newText;
        this._callSubscriber(this._state);
      }

    } else if (action.type === 'UPDATE-NEW-MESSAGE-TEXT') {
      if (action.newText) {
        this._state.dialogsPage.currentMessageText = action.newText;
        this._callSubscriber(this._state);
      }
    } */

  }
}
