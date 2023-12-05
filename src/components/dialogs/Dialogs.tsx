import React from 'react';
import s from './Dialogs.module.css'
import { ChatMenu } from './chatMenu/ChatMenu';
import { DialogsSection } from './dialogsSection/DialogsSection';
import { ContactType, DialogType, PostType } from '../../redux/state';


type DialogsPropsType = {
  dialogsData: {
    messageContacts: ContactType[],
    dialogs: DialogType
    currentMessageText: string
  },
  addMessageToDialog: () => void
  updateNewMessageText: (text: string) => void
}

export const Dialogs: React.FC<DialogsPropsType> = (props) => {

  let dialogWithContact = props.dialogsData.dialogs[1]; // сюда надо как-то закинуть объект с нужными диалогами

  return (
    <div className={s.content}>

      <DialogsSection
        dialog={dialogWithContact}
        addMessageToDialog={props.addMessageToDialog}
        currentMessageText={props.dialogsData.currentMessageText}
        updateNewMessageText={props.updateNewMessageText}

        />
      <ChatMenu messageContacts={props.dialogsData.messageContacts} />

    </div>
  );
};

