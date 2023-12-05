import { rerenderEntireTree } from "../rerender"

export type ContactType = {
  id: number
  name: string
}

export type DialogItemType = {
  id: number
  name: string
  message: string
}

export type DialogType = {
  [key: string]: DialogItemType[],
}

export type PostType = {
  id: number
  name:  string
  message: string
  likes: number
}

export type StateType = {
  profilePage:{
    currentText: string
    posts: PostType[]
  },
  dialogsPage: {
    messageContacts: ContactType[]
    currentMessageText: string
    dialogs: DialogType
  }
}

const user = {id: 0, name:'Fluffy Gangster'}

const messageContacts: ContactType[] = [
  /* {id: 0, name:'Fluffy Gangster'}, */
  {id: 1, name:'Missis Marple'},
  {id: 2, name:'Luna'},
  {id: 3, name:'Toby'},
  {id: 4, name:'Cleo'},
  {id: 5, name:'Choupette'},
  {id: 6, name:'Pumpkine'},
]

export const state: StateType = {
  profilePage: {
    currentText: '',
    posts: [
      {
        id: Date.now() * Math.random(),
        name:  messageContacts[0].name,
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
    messageContacts: messageContacts,
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
}

export const addMessageToDialog = () => {

  const newMessage = {
    id: messageContacts[0].id + Math.random(),
    name: user.name,
    message: state.dialogsPage.currentMessageText
  }


  //коррекиный вариант - иммутабельный

  /* const updatedDialogs = {...state,
                            dialogsPage: {...state.dialogsPage,
                              dialogs: {...state.dialogsPage.dialogs,
                                [messageContacts[0].id]: [...state.dialogsPage.dialogs[messageContacts[0].id], newMessage]}}}
    console.log(updatedDialogs)
  return updatedDialogs; */

  //неправильный вариант - мутабельный

  state.dialogsPage.dialogs[messageContacts[0].id].push(newMessage);
  state.dialogsPage.currentMessageText = '';
  console.log(state)
  rerenderEntireTree(state)

}

export const addPost = () => {
  const newPost = {
    id: Date.now() * Math.random(),
    name: messageContacts[0].name,
    message: state.profilePage.currentText,
    likes: 0
  }
  //неправильный вариант - мутабельный
  state.profilePage.posts.unshift(newPost);
  state.profilePage.currentText = '';
  rerenderEntireTree(state)
}

export const updateNewPostText = (newText: string) => {
  state.profilePage.currentText = newText;
  rerenderEntireTree(state)
}

export const updateNewMessageText = (newText: string) => {
  state.dialogsPage.currentMessageText = newText;
  rerenderEntireTree(state)
}



/* const messageContacts: ContactType[] = [
  {id: 0, name:'Pumpkine'},
  {id: 1, name:'Missis Marple'},
  {id: 2, name:'Luna'},
  {id: 3, name:'Toby'},
  {id: 4, name:'Cleo'},
  {id: 5, name:'Choupette'},
] */


/* const dialogs: DialogType = {
  [messageContacts[0].id]: [
    {
      id: Number(messageContacts[0].id + 1),
      name:  'Pumpkine',
      message: `Hi, how's it going today?`,
    },
    {
      id: 12,
      name:  'Fluffy Gangster',
      message: ` Hey there! Just napping as usual. You?`,
    },
    {
      id: 13,
      name:  'Pumpkine',
      message: `Same here, napping is our superpower. 😴`,
    },
    {
      id: 14,
      name:  'Fluffy Gangster',
      message: `Absolutely! But don't forget the occasional playtime.`,
    },
    {
      id: 15,
      name:  'Pumpkine',
      message: `You're right, chasing feather toys is a must! 🐾`,
    },
    {
      id: 16,
      name:  'Pumpkine',
      message: `Need to rest`,
    },
  ],
  [messageContacts[1].id]: [
    {
      id: 21,
      name:  'Missis Marple',
      message: `Hey there!`,
    },
    {
      id: 22,
      name:  'Fluffy Gangster',
      message: `Meow! How are you doing?`,
    },
    {
      id: 23,
      name:  'Missis Marple',
      message: `I'm good, thanks! How about you?`,
    },
    {
      id: 24,
      name:  'Fluffy Gangster',
      message: `Purr purr... Just enjoying the day!`,
    },

  ]
} */


/* export const posts: PostType[] = [
  {
    id: Date.now() * Math.random(),
    name:  'Fluffy Gangster',
    message: `Paws up, it's time for another purr-fect day!`,
    likes: 21
  },
  {
    id: Date.now() * Math.random(),
    name:  'Fluffy Gangster',
    message: `Just caught a toy mouse 🐭 and feeling like a true hunter! 😼`,
    likes: 7
  },
  {
    id: Date.now() * Math.random(),
    name:  'Fluffy Gangster',
    message: `Is it dinner time yet? I'm feline pretty hungry. 🍽️`,
    likes: 12
  },
] */

