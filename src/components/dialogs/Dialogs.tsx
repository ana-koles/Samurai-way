import React, { useContext } from 'react';
import s from './Dialogs.module.css'
import ChatMenu from './chatMenu/ChatMenu';
import { DialogsSectionContainer } from './dialogsSection/DialogsSectionContainer';



type DialogsPropsType = {
}

export const Dialogs: React.FC<DialogsPropsType> = (props) => {
  
  return (
    <div className={s.content}>
      <DialogsSectionContainer/>
      <ChatMenu  />
    </div>
  );
};

