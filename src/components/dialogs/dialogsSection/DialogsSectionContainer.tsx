import React, { Dispatch } from 'react';
import { DialogItemType} from '../../../redux/store';
import { DialogReducerActionType, addMessageToDialogAC, updateNewMessageTextAC } from '../../../redux/dialogs-reducer';
import { DialogsSection } from './DialogsSection';
import { connect } from 'react-redux';
import { AppRootStateType } from '../../../redux/redux-store';


type DialogsSectionPropsType = {
  store: any
  dialog: DialogItemType[]
}

type MapStateToPropsType = {
  dialog: DialogItemType[],
  currentMessageText: string
}

type MapDispatchToPropsType = {
  addMessageToDialog: (userId: number, userName: string) => void
  updateNewMessageText: (newText: string) => void
}

/* export const DialogsSectionContainer:React.FC<DialogsSectionPropsType> = (props) => {

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
}; */


const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
  return {
    dialog: state.dialogsPage.dialogs[1],
    currentMessageText: state.dialogsPage.currentMessageText
  }
}

const mapDispatchToProps = (dispatch: Dispatch<DialogReducerActionType>): MapDispatchToPropsType => {
  return {
    addMessageToDialog: (userId, userName) => {
      dispatch(addMessageToDialogAC(userId, userName))
    },
    updateNewMessageText: (newText) => {
      dispatch(updateNewMessageTextAC(newText))
    }
  }
}

export const DialogsSectionContainer = connect(mapStateToProps, mapDispatchToProps)(DialogsSection)
