import React, { Dispatch } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { addMessageToDialogAC, DialogItemType, DialogReducerActionType } from "../../../model/dialogs-reducer";
import { AppRootStateType } from "../../../../../redux/redux-store";
import { withAuthRedirect } from "../../../../../hoc/withAuthRedirect";
import { DialogsSection } from "./DialogsSection";

type MapStateToPropsType = {
  dialog: DialogItemType[];
};

type MapDispatchToPropsType = {
  addMessageToDialog: (
    userId: number,
    userName: string,
    newMessage: string
  ) => void;
};

export type DialogsSectionPropsType = MapDispatchToPropsType &
  MapStateToPropsType;


const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
  return {
    dialog: state.dialogsPage.dialogs[1],
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<DialogReducerActionType>
): MapDispatchToPropsType => {
  return {
    addMessageToDialog: (userId, userName, newMessage) => {
      dispatch(addMessageToDialogAC(userId, userName, newMessage));
    },
  };
};

export const DialogsSectionContainer = compose<React.ComponentType>(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(DialogsSection);

