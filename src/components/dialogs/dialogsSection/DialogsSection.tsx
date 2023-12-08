import React, { ChangeEvent, useState } from 'react';
import s from './DialogsSection.module.css'
import { MyDialog } from './myDialog/MyDialog';
import { DialogFriend } from './dialogFriend/DialogFriend';
import { DialogItemType, StateType } from '../../../redux/state';
import { Button } from '../../button/Button';


type DialogsSectionPropsType = {
  dialog: DialogItemType[]
  currentMessageText: string
  addMessageToDialog: () => void
  updateNewMessageText: (text: string) => void
}

export const DialogsSection:React.FC<DialogsSectionPropsType> = (props) => {
  debugger;

    //с помощью React.createRef
/*   переменная newPostText будет содержать ссылку на DOM-узел <textarea>, и вы можете
использовать эту ссылку в коде для взаимодействия с этим элементом, таким как получение
 его значения или изменение его свойств.
 */
  const newDialogMessage:React.LegacyRef<HTMLTextAreaElement> = React.createRef();

  const onChangeHandler = () => {
    if (newDialogMessage.current) {
      props.updateNewMessageText(newDialogMessage.current.value);
      console.log('change');
    }
  }

  const addMessageToDialog = () => {
    props.addMessageToDialog();

  }

  return (
    <div className = {s.dialog_section}>
        <div className ={s.title_wrapper}>
            <h2>Cat Talks</h2>
        </div>

        {props.dialog.map(d => d.name === 'Fluffy Gangster' ?  <MyDialog dialog={d}/> : <DialogFriend dialog={d}/>)}

        <div className={s.message_input}>
          <textarea
                  ref={newDialogMessage}
                  placeholder='Enter message...'
                  value={props.currentMessageText}
                  onChange={onChangeHandler}>
          </textarea>
          <Button name='post' callback={addMessageToDialog}/>
        </div>
    </div>
  );
};

