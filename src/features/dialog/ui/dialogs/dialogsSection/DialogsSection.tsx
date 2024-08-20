import React from 'react';
import s from './DialogsSection.module.css'
import { DialogFormDataType, DialogReduxForm } from './dialogForm/DialogForm';
import { DialogFriend } from './dialogFriend/DialogFriend';
import { MyDialog } from './myDialog/MyDialog';
import { reset } from 'redux-form';
import { selectDialogs } from '../../../model/dialogs-selectors';
import { useDispatch, useSelector } from 'react-redux';
import { addMessageToDialogAC } from '../../../model/dialogs-reducer';


export const DialogsSection = (props: {}) => {
  const dialogs = useSelector(selectDialogs)
  const dispatch = useDispatch()
  const addMessageToDialog = (values: DialogFormDataType) => {
    let newMessage = values.currentMessageText;
    dispatch(addMessageToDialogAC(0, 'Fluffy Gangster', newMessage));
    reset('dialog')
  }

  return (
    <div className = {s.dialog_section}>
        <div className ={s.title_wrapper}>
            <h2>Cat Talks</h2>
        </div>
        {dialogs[1].map(d => d.name === 'Fluffy Gangster' ?  <MyDialog dialog={d} key={d.id}/> : <DialogFriend dialog={d} key={d.id}/>)}
        <DialogReduxForm onSubmit={addMessageToDialog}/>
    </div>
  );
};

