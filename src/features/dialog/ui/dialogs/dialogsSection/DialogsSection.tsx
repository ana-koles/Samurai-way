import React from 'react';
import s from './DialogsSection.module.css'
import { DialogsSectionPropsType } from './DialogsSectionContainer';
import { DialogFormDataType, DialogReduxForm } from './dialogForm/DialogForm';
import { DialogFriend } from './dialogFriend/DialogFriend';
import { MyDialog } from './myDialog/MyDialog';


export const DialogsSection:React.FC<DialogsSectionPropsType> = (props) => {
    //с помощью React.createRef
/*   переменная newPostText будет содержать ссылку на DOM-узел <textarea>, и вы можете
использовать эту ссылку в коде для взаимодействия с этим элементом, таким как получение
 его значения или изменение его свойств.
 */
  const newDialogMessage:React.LegacyRef<HTMLTextAreaElement> = React.createRef();

  const addMessageToDialog = (values: DialogFormDataType) => { //приходят данные из формы
    let newMessage = values.currentMessageText;
    props.addMessageToDialog(0, 'Fluffy Gangster', newMessage)


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

        <DialogReduxForm onSubmit={addMessageToDialog}/>
        {/* <div className={s.message_input}>
          <textarea
                  ref={newDialogMessage}
                  placeholder='Enter message...'
                  value={props.currentMessageText}
                  onChange={onChangeHandler}>
          </textarea>
          <Button name='post' callback={addMessageToDialog}/>
        </div> */}
    </div>
  );
};

