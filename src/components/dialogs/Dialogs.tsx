import React from 'react';
import s from './Dialogs.module.css'
import { ChatMenu } from './chatMenu/ChatMenu';
import { DialogsSection } from './dialogsSection/DialogsSection';
import { ContactType, DialogType, PostType } from '../../redux/state';




type DialogsPropsType = {
  dialogsData: {
    messageContacts: ContactType[],
    dialogs: DialogType
  }
}

export const Dialogs: React.FC<DialogsPropsType> = (props) => {

  let dialogWithContact = props.dialogsData.dialogs[0]; // сюда надо как-то закинуть объект с нужными диалогами

  return (
    <div className={s.content}>

      <DialogsSection dialog={dialogWithContact} />
      <ChatMenu messageContacts={props.dialogsData.messageContacts} />

    </div>
  );
};

