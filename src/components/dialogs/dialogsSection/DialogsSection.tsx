import React from 'react';
import s from './DialogsSection.module.css'
import { MyDialog } from './myDialog/MyDialog';
import { DialogFriend } from './dialogFriend/DialogFriend';
import { DialogItemType } from '../../../redux/state';


type DialogsSectionPropsType = {
  dialog: DialogItemType[];
}

export const DialogsSection:React.FC<DialogsSectionPropsType> = (props) => {


  return (
    <div className = {s.dialog_section}>
        <div className ={s.title_wrapper}>
            <h2>Cat Talks</h2>
        </div>


        {props.dialog.map(d => d.name === 'Fluffy Gangster' ?  <MyDialog dialog={d}/> : <DialogFriend dialog={d}/>)}
    </div>
  );
};

