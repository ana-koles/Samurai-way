import React from 'react';
import photo from '../../../../assets/cat-profile2.jpg'
import s from './MyDialog.module.css'
import { DialogItemType } from '../../../../redux/dialogs-reducer';

type DialogPropsType = {
  dialog: DialogItemType
}

export const MyDialog:React.FC<DialogPropsType> = (props) => {

  let {id, name, message} = props.dialog;

  return (
    <div id={id.toString()} className={s.dialog_wrapper}>

      <div className={s.dialog_content_wrapper}>

        <div className={s.user_info}>
          <h3>{name}</h3>
          <p>{message}</p>
        </div>

        <img src={photo} alt="user" />

    </div>

  </div>
  );
};

