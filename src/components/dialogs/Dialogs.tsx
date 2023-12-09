import React from 'react';
import s from './Dialogs.module.css'
import { ChatMenu } from './chatMenu/ChatMenu';
import { DialogsSection } from './dialogsSection/DialogsSection';
import { ActionType, ContactType, DialogType, PostType, StateType } from '../../redux/state';


type DialogsPropsType = {
  dialogsData: {
    messageContacts: ContactType[],
    dialogs: DialogType
    currentMessageText: string
  },
  /* addMessageToDialog: () => void
  updateNewMessageText: (text: string) => void */
  dispatch: (action: ActionType) => void

}

export const Dialogs: React.FC<DialogsPropsType> = (props) => {
  let dialogWithContact = props.dialogsData.dialogs[1]; // сюда надо как-то закинуть объект с нужными диалогами
  return (
    <div className={s.content}>

      <DialogsSection
        dialog={dialogWithContact}
        currentMessageText={props.dialogsData.currentMessageText}
        /* updateNewMessageText={props.updateNewMessageText}
        addMessageToDialog={props.addMessageToDialog} */
        dispatch={props.dispatch}
        />
      <ChatMenu messageContacts={props.dialogsData.messageContacts} />

    </div>
  );
};

