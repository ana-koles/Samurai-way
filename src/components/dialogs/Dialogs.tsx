import React from 'react';
import s from './Dialogs.module.css'
import { DialogFriend } from './dialogsSection/dialogFriend/DialogFriend';
import { MyDialog } from './dialogsSection/myDialog/MyDialog';
import { ChatMenu } from './chatMenu/ChatMenu';
import { DialogsSection } from './dialogsSection/DialogsSection';

export type DialogType = {
  id: number
  name: string
  message: string

}

const dialogs: DialogType[]  = [
  {
    id: Date.now() * Math.random(),
    name:  'Choupette',
    message: `Hi, how's it going today?`,
  },
  {
    id: Date.now() * Math.random(),
    name:  'Fluffy Gangster',
    message: ` Hey there! Just napping as usual. You?`,
  },
  {
    id: Date.now() * Math.random(),
    name:  'Choupette',
    message: `Same here, napping is our superpower. 😴`,
  },
  {
    id: Date.now() * Math.random(),
    name:  'Fluffy Gangster',
    message: `Absolutely! But don't forget the occasional playtime.`,
  },
  {
    id: Date.now() * Math.random(),
    name:  'Choupette',
    message: `You're right, chasing feather toys is a must! 🐾`,
  },

]

export const Dialogs = () => {

  return (
    <div className={s.content}>

      <DialogsSection dialogs={dialogs}/>
      <ChatMenu/>

    </div>
  );
};

