import React from 'react';
import s from './Dialogs.module.css'
import { ChatMenu } from './chatMenu/ChatMenu';
import { DialogsSection } from './dialogsSection/DialogsSection';
import { ActionType, ContactType, DialogPageType, DialogType, MessageContactsType, PostType, StateType, UserType } from '../../redux/state';


type DialogsPropsType = {
  dialogsData: DialogPageType,
  dispatch: (action: ActionType) => void
  messageContacts: MessageContactsType
  user: UserType

}

export const Dialogs: React.FC<DialogsPropsType> = (props) => {
  let dialogWithContact = props.dialogsData.dialogs[1]; // сюда надо как-то закинуть объект с нужными диалогами
  return (
    <div className={s.content}>

      <DialogsSection
        dialog={dialogWithContact}
        currentMessageText={props.dialogsData.currentMessageText}
        dispatch={props.dispatch}
        user={props.user}
        messageContacts={props.messageContacts}
        />
      <ChatMenu messageContacts={props.messageContacts} />

    </div>
  );
};

