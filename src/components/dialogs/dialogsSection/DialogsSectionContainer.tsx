import React, { Dispatch } from 'react';
import { DialogItemType, DialogReducerActionType, addMessageToDialogAC } from '../../../redux/dialogs-reducer';
import { DialogsSection } from './DialogsSection';
import { connect } from 'react-redux';
import { AppRootStateType } from '../../../redux/redux-store';
import { withAuthRedirect } from '../../../hoc/withAuthRedirect';
import { compose } from 'redux';


type MapStateToPropsType = {
  dialog: DialogItemType[],
}

type MapDispatchToPropsType = {
  addMessageToDialog: (userId: number, userName: string, newMessage: string) => void
}

export type DialogsSectionPropsType = MapDispatchToPropsType & MapStateToPropsType;

//создаем контейнерную компоненту над DialogsSection (по факту возвращаем 2 контейнерные компоненты над DialogsSection)
//const AuthRedirectComponent = withAuthRedirect(DialogsSection);

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
  return {
    dialog: state.dialogsPage.dialogs[1],
  }
}

const mapDispatchToProps = (dispatch: Dispatch<DialogReducerActionType>): MapDispatchToPropsType => {
  return {
    addMessageToDialog: (userId, userName, newMessage) => {
      dispatch(addMessageToDialogAC(userId, userName, newMessage))
    },
  }
}


//этот код вместо
//const AuthRedirectComponent = withAuthRedirect(DialogsSection); и
//connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)
//compose - позволяет создавать последовательный вызов ф-ций с передачей результута вызово предыдщуей ф-ции
// в последующую
export const DialogsSectionContainer = compose<React.ComponentType>( //говорит реакту, что создаем комоненту
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(DialogsSection)

//export const DialogsSectionContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)
