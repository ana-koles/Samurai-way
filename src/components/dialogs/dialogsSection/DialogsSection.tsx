import React, { ChangeEvent, useState } from 'react';
import s from './DialogsSection.module.css'
import { MyDialog } from './myDialog/MyDialog';
import { DialogFriend } from './dialogFriend/DialogFriend';
import { DialogItemType } from '../../../redux/state';
import { Button } from '../../button/Button';


type DialogsSectionPropsType = {
  dialog: DialogItemType[]
  addMessageToDialog: (text: string) => void
}

export const DialogsSection:React.FC<DialogsSectionPropsType> = (props) => {

  const [message, setMessage] = useState('');
  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.currentTarget.value)
  }

  const addMessageToDialog = () => {
    props.addMessageToDialog(message);
    setMessage('');
  }

  return (
    <div className = {s.dialog_section}>
        <div className ={s.title_wrapper}>
            <h2>Cat Talks</h2>
        </div>

        {props.dialog.map(d => d.name === 'Fluffy Gangster' ?  <MyDialog dialog={d}/> : <DialogFriend dialog={d}/>)}

        <div className={s.message_input}>
          <textarea
                  placeholder='Enter message...'
                  value={message}
                  onChange={onChangeHandler}>
          </textarea>
          <Button name='post' callback={addMessageToDialog}/>
        </div>
    </div>
  );
};

