import React from 'react';
import s from './Dialogs.module.css'
import { ChatMenu } from './chatMenu/ChatMenu';
import { DialogsSection } from './dialogsSection/DialogsSection';
import { ActionType, ContactType, DialogPageType, DialogType, MessageContactsType, PostType, StateType, UserType } from '../../redux/store';
import { DialogsSectionContainer } from './dialogsSection/DialogsSectionContainer';


/* type DialogsPropsType = {
  dialogsData: DialogPageType,
  dispatch: (action: ActionType) => void
  messageContacts: MessageContactsType
  user: UserType
} */

type DialogsPropsType = {
  store: any
}

export const Dialogs: React.FC<DialogsPropsType> = (props) => {
  let state = props.store.getState();

  let dialogWithContact = state.dialogsPage.dialogs[1]; // сюда надо как-то закинуть объект с нужными диалогами

  return (
    <div className={s.content}>

      <DialogsSectionContainer
                  store={props.store}
                  dialog={dialogWithContact}

        /* dialog={dialogWithContact}
        currentMessageText={props.dialogsData.currentMessageText}
        dispatch={props.dispatch}
        user={props.user}
        messageContacts={props.messageContacts} */
        />
      <ChatMenu messageContacts={state.messageContacts} />

    </div>
  );
};

