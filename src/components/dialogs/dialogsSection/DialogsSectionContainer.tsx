import React from 'react';
import { DialogItemType} from '../../../redux/store';
import { addMessageToDialogAC, updateNewMessageTextAC } from '../../../redux/dialogs-reducer';
import { DialogsSection } from './DialogsSection';


type DialogsSectionPropsType = {
  store: any
  dialog: DialogItemType[]
}

export const DialogsSectionContainer:React.FC<DialogsSectionPropsType> = (props) => {

  let state = props.store.getState();

  const updateNewMessageText = (newText: string) => {
    props.store.dispatch(updateNewMessageTextAC(newText))
  }

  const addMessageToDialog = (userId: number, userName: string) => {
    props.store.dispatch(addMessageToDialogAC(userId, userName))
  }

  return (
    <DialogsSection
          dialog={props.dialog}
          currentMessageText={state.dialogsPage.currentMessageText}
          addMessageToDialog={addMessageToDialog}
          updateNewMessageText={updateNewMessageText}
    />
  );
};

