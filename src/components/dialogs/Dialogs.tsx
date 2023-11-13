import React from 'react';
import s from './Dialogs.module.css'
import { DialogFriend } from './dialogsSection/dialogFriend/DialogFriend';
import { MyDialog } from './dialogsSection/myDialog/MyDialog';
import { ChatMenu } from './chatMenu/ChatMenu';
import { DialogsSection } from './dialogsSection/DialogsSection';

type ContactType = {
  id: number
  name: string
}

export type MessageContactsType = ContactType[]

const messageContacts: MessageContactsType = [
  {id: 1, name:'Pumpkine'},
  {id: 2, name:'Missis Marple'},
  {id: 3, name:'Luna'},
  {id: 4, name:'Toby'},
  {id: 5, name:'Cleo'},
  {id: 6, name:'Choupette'},
]

export type DialogItemType = {
  id: number
  name: string
  message: string
}

export type DialogType = {
  [key: string]: DialogItemType[],
}

const dialogs: DialogType = {
  [messageContacts[0].id]: [
    {
      id: 11,
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
    }
  ]
}


type DialogsType = {
  contactId: number //НЕ ЗАБЫТЬ ПЕРЕДАТЬ СЮДА ПРОПСЫ
}

export const Dialogs: React.FC<DialogsType> = (props) => {
  debugger;
  /* let dialogObj = dialogs[props.contactId]; */
  let dialogObj = dialogs[1];

  return (
    <div className={s.content}>

      <DialogsSection dialogs={dialogObj}/>
      <ChatMenu messageContacts={messageContacts}/>

    </div>
  );
};

