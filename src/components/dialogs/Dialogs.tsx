import React from 'react';
import s from './Dialogs.module.css'
import { ChatMenu } from './chatMenu/ChatMenu';
import { DialogsSection } from './dialogsSection/DialogsSection';
import { DialogType, MessageContactsType, dialogs, messageContacts } from '../../data/dialogs';



type DialogsType = {
 /*  contactId: number //НЕ ЗАБЫТЬ ПЕРЕДАТЬ СЮДА ПРОПСЫ */
/*   dialogs: DialogType
  messageContacts: MessageContactsType */
}

export const Dialogs: React.FC<DialogsType> = (props) => {

/*   let dialogObj = dialogs[props.contactId]; */
  let dialogWithContact = dialogs[0]; // сюда надо как-то закинуть объект с нужными диалогами

  return (
    <div className={s.content}>

      <DialogsSection dialog={dialogWithContact} />
      <ChatMenu messageContacts={messageContacts} />

    </div>
  );
};

