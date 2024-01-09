import { connect } from "react-redux";
import { Users } from "./UsersC";
import { AppRootStateType } from "../../redux/redux-store";
import { SetUsersAC, UpdateFollowAC, UserType , UsersPageActionType } from "../../redux/users-reducer";
import { Dispatch } from "redux";

//типизация стейта
type MapStateToPropsType = {
  users: UserType[]
}

//типизация пропсов
type MapDispatchToPropsType = {
  updateFollow: (userId: number) => void //возможно надо будет исправить на string
  setUsers: (users: UserType[]) => void
}

export type UsersContainerPropsType = MapDispatchToPropsType & MapStateToPropsType;

let mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
  return {
    users: state.usersPage.users
  }
}

let mapDispatchToProps = (dispatch: Dispatch<UsersPageActionType>): MapDispatchToPropsType => {
  return {
    updateFollow: (userId: number) => { //возможно надо удет исправить на string
      dispatch(UpdateFollowAC(userId))
    },
    setUsers: (users: UserType[]) => {
      dispatch(SetUsersAC(users))
    }
  }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);