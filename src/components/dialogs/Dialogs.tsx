import React, { useContext } from 'react';
import s from './Dialogs.module.css'
import ChatMenu from './chatMenu/ChatMenu';
import { DialogsSectionContainer } from './dialogsSection/DialogsSectionContainer';



type DialogsPropsType = {
}

export const Dialogs: React.FC<DialogsPropsType> = (props) => {
 /*  let state = props.store.getState(); */

  /* let dialogWithContact = state.dialogsPage.dialogs[1]; */ // сюда надо как-то закинуть объект с нужными диалогами

  return (
    <div className={s.content}>

      <DialogsSectionContainer
/*                   store={props.store}
                  dialog={dialogWithContact} */
        />
      <ChatMenu  />

    </div>
  );
};

