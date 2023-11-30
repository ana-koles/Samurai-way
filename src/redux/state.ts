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

const messageContacts: ContactType[] = [
  {id: 0, name:'Fluffy Gangster'},
  {id: 1, name:'Missis Marple'},
  {id: 2, name:'Luna'},
  {id: 3, name:'Toby'},
  {id: 4, name:'Cleo'},
  {id: 5, name:'Choupette'},
  {id: 6, name:'Pumpkine'},
]

export const state = {
  profilePage: {
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
    dialogs: {
      [messageContacts[0].id]: [
        {
          id: Number(messageContacts[0].id + 1),
          name:  messageContacts[0].name,
          message: `Hi, how's it going today?`,
        },
        {
          id: 12,
          name:  'Fluffy Gangster',
          message: ` Hey there! Just napping as usual. You?`,
        },
        {
          id: 13,
          name:  messageContacts[0].name,
          message: `Same here, napping is our superpower. 😴`,
        },
        {
          id: 14,
          name:  'Fluffy Gangster',
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
          name:  'Fluffy Gangster',
          message: `Meow! How are you doing?`,
        },
        {
          id: 23,
          name:  messageContacts[1].name,
          message: `I'm good, thanks! How about you?`,
        },
        {
          id: 24,
          name:  'Fluffy Gangster',
          message: `Purr purr... Just enjoying the day!`,
        },

      ]
    },
  }
}

export const addMessageToDialog = (text: string) => {

  const newMessage = {
    id: messageContacts[0].id + Math.random(),
    name: messageContacts[0].name,
    message: text
  }


  //коррекиный вариант - иммутабельный

  /* const updatedDialogs = {...state, dialogsPage: {...state.dialogsPage, dialogs: {...state.dialogsPage.dialogs, [userId]: [...state.dialogsPage.dialogs[userId], newMessage]}}}

  return updatedDialogs; */

  //неправильный вариант - мутабельный

  state.dialogsPage.dialogs[messageContacts[0].id].push(newMessage)

}

export const addPost = (text: string) => {
  const newPost = {
    id: Date.now() * Math.random(),
    name: messageContacts[0].name,
    message: text,
    likes: 0
  }
  //неправильный вариант - мутабельный
  state.profilePage.posts.unshift(newPost);
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

