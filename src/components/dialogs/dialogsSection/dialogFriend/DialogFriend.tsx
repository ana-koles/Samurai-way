import React from 'react';
import s from './DialogFriend.module.css'
import photo4 from '../../../../assets/friend4.jpg'
import { DialogType } from '../../Dialogs';

type DialogPropsType = {
  dialog: DialogType
}

export const DialogFriend: React.FC<DialogPropsType> = (props) => {

  let {id, name, message} = props.dialog;

  return (
    <div className={s.dialog_wrapper}>

      <div className={s.dialog_content_wrapper}>

        <img src={photo4} alt="user" />

        <div className={s.user_info}>
          <h3>{name}</h3>
          <p>{message}</p>
        </div>

    </div>

  </div>
  );
};

