import React, { Dispatch } from 'react';
import { DialogItemType, DialogReducerActionType, addMessageToDialogAC, updateNewMessageTextAC } from '../../../redux/dialogs-reducer';
import { DialogsSection } from './DialogsSection';
import { connect } from 'react-redux';
import { AppRootStateType } from '../../../redux/redux-store';
import { withAuthRedirect } from '../../../hoc/withAuthRedirect';


type MapStateToPropsType = {
  dialog: DialogItemType[],
  currentMessageText: string,
}

type MapDispatchToPropsType = {
  addMessageToDialog: (userId: number, userName: string) => void
  updateNewMessageText: (newText: string) => void
}

export type DialogsSectionPropsType = MapDispatchToPropsType & MapStateToPropsType;

//создаем контейнерную компоненту над DialogsSection (по факту возвращаем 2 контейнерные компоненты над DialogsSection)
const AuthRedirectComponent = withAuthRedirect(DialogsSection);

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
  return {
    dialog: state.dialogsPage.dialogs[1],
    currentMessageText: state.dialogsPage.currentMessageText,
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


export const DialogsSectionContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)
