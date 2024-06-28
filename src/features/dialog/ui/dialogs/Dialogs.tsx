import React, { useContext } from 'react';
import s from './Dialogs.module.css'
import ChatMenu from './chatMenu/ChatMenu';
import { DialogsSectionContainer } from './dialogsSection/DialogsSectionContainer';


const Dialogs = () => {
  console.log('Dialogs')
  return (
    <div className={s.content}>
      <DialogsSectionContainer/>
      <ChatMenu  />
    </div>
  );
};

export default Dialogs;

