import React from 'react';
import s from './Dialogs.module.css'
import { ChatMenu } from './chatMenu/ChatMenu';
import { DialogsSection } from './dialogsSection/DialogsSection';
import { DialogType, dialogs, messageContacts } from '../../data/dialogs';



type DialogsType = {
  dialogs: DialogType
}

export const Dialogs: React.FC<DialogsType> = (props) => {

  let dialogWithContact = props.dialogs[0]; // сюда надо как-то закинуть объект с нужными диалогами

  return (
    <div className={s.content}>

      <DialogsSection dialog={dialogWithContact} />
      <ChatMenu messageContacts={messageContacts} />

    </div>
  );
};

