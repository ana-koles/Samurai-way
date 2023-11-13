import React from 'react';
import s from './DialogsSection.module.css'
import { MyDialog } from './myDialog/MyDialog';
import { DialogFriend } from './dialogFriend/DialogFriend';
import { DialogItemType, DialogType } from '../Dialogs';

type DialogsSectionPropsType = {
  dialogs: DialogItemType[];
}

export const DialogsSection:React.FC<DialogsSectionPropsType> = (props) => {


  return (
    <div className = {s.dialog_section}>
        <div className ={s.title_wrapper}>
            <h2>Cat Talks</h2>
        </div>


        {props.dialogs.map((d, index) => index % 2 === 0 ? <DialogFriend dialog={d}/> : <MyDialog dialog={d}/>)}
    </div>
  );
};

