export type ContactType = {
  id: number
  name: string
}

export const messageContacts: ContactType[] = [
  {id: 0, name:'Pumpkine'},
  {id: 1, name:'Missis Marple'},
  {id: 2, name:'Luna'},
  {id: 3, name:'Toby'},
  {id: 4, name:'Cleo'},
  {id: 5, name:'Choupette'},
]

export type DialogItemType = {
  id: number
  name: string
  message: string
}

export type DialogType = {
  [key: string]: DialogItemType[],
}

export const dialogs: DialogType = {
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
}