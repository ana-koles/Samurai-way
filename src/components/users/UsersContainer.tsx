import { connect } from "react-redux";
import { Users } from "./Users";
import { AppRootStateType } from "../../redux/redux-store";
import { SetUsersAC, UpdateFollowAC, UserType, UsersPageActionType } from "../../redux/users-reducer";
import { Dispatch } from "redux";

type MapStateToPropsType = {
  users: UserType[]
}

type mapDispatchToPropsType = {
  updateFollow: (userId: string) => void
  setUsers: (users: UserType[]) => void
}

let mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
  return {
    users: state.usersPage.users
  }
}

let mapDispatchToProps = (dispatch: Dispatch<UsersPageActionType>): mapDispatchToPropsType => {
  return {
    updateFollow: (userId: string) => {
      dispatch(UpdateFollowAC(userId))
    },
    setUsers: (users: UserType[]) => {
      dispatch(SetUsersAC(users))
    }
  }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);