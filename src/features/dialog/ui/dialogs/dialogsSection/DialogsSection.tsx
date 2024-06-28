import React from 'react';
import s from './DialogsSection.module.css'
import { DialogsSectionPropsType } from './DialogsSectionContainer';
import { DialogFormDataType, DialogReduxForm } from './dialogForm/DialogForm';
import { DialogFriend } from './dialogFriend/DialogFriend';
import { MyDialog } from './myDialog/MyDialog';
import { reset } from 'redux-form';


export const DialogsSection:React.FC<DialogsSectionPropsType> = (props) => {
  const addMessageToDialog = (values: DialogFormDataType) => {
    let newMessage = values.currentMessageText;
    props.addMessageToDialog(0, 'Fluffy Gangster', newMessage);
    reset('dialog')
  }

  return (
    <div className = {s.dialog_section}>
        <div className ={s.title_wrapper}>
            <h2>Cat Talks</h2>
        </div>
        {props.dialog.map(d => d.name === 'Fluffy Gangster' ?  <MyDialog dialog={d} key={d.id}/> : <DialogFriend dialog={d} key={d.id}/>)}
        <DialogReduxForm onSubmit={addMessageToDialog}/>
    </div>
  );
};

