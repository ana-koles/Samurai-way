import React, { ChangeEvent, useState } from 'react';
import s from './DialogsSection.module.css'
import { MyDialog } from './myDialog/MyDialog';
import { DialogFriend } from './dialogFriend/DialogFriend';
import { Button } from '../../button/Button';
import { DialogItemType, addMessageToDialogAC, updateNewMessageTextAC } from '../../../redux/dialogs-reducer';
import { DialogsSectionPropsType } from './DialogsSectionContainer';
import { Redirect } from 'react-router-dom';


export const DialogsSection:React.FC<DialogsSectionPropsType> = (props) => {
    //с помощью React.createRef
/*   переменная newPostText будет содержать ссылку на DOM-узел <textarea>, и вы можете
использовать эту ссылку в коде для взаимодействия с этим элементом, таким как получение
 его значения или изменение его свойств.
 */
  const newDialogMessage:React.LegacyRef<HTMLTextAreaElement> = React.createRef();

  const onChangeHandler = () => {
    if (newDialogMessage.current) {
      props.updateNewMessageText(newDialogMessage.current.value)
    }
  }

  const addMessageToDialog = () => {
    props.addMessageToDialog(0, "Fluffy Gangster")
  }

/*   if (!props.isAuth) {
    return <Redirect to={'/login'}/>
  } */

  return (
    <div className = {s.dialog_section}>
        <div className ={s.title_wrapper}>
            <h2>Cat Talks</h2>
        </div>

        {props.dialog.map(d => d.name === 'Fluffy Gangster' ?  <MyDialog dialog={d} key={d.id}/> : <DialogFriend dialog={d} key={d.id}/>)}

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

