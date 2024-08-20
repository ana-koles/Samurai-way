import React from 'react';
import s from './Dialogs.module.css'
import ChatMenu from './chatMenu/ChatMenu'
import { DialogsSection } from './dialogsSection/DialogsSection';


const Dialogs = () => {

  return (
    <div className={s.content}>
      <DialogsSection/>
      <ChatMenu  />
    </div>
  );
};

export default Dialogs;

