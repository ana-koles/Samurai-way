import { connect } from "react-redux";
import { UsersAPIComponent } from "./UsersAPIComponent";
import { AppRootStateType } from "../../redux/redux-store";
import { SetCurrentPageAC, SetTotalUsersCountAC, SetUsersAC, UpdateFollowAC, UserType , UsersPageActionType } from "../../redux/users-reducer";
import { Dispatch } from "redux";

//типизация стейта
type MapStateToPropsType = {
  users: UserType[],
  currentPage: number
  totalUsersCount: number
  pageCount: number
}

//типизация пропсов
type MapDispatchToPropsType = {
  updateFollow: (userId: number) => void //возможно надо будет исправить на string
  setUsers: (users: UserType[]) => void
  setCurrentPage: (currentPage: number) => void
  setTotalUsersCount: (totalUsersCount: number) => void
}

export type UsersContainerPropsType = MapDispatchToPropsType & MapStateToPropsType;

let mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
  return {
    users: state.usersPage.users,
    currentPage: state.usersPage.currentPage,
    totalUsersCount: state.usersPage.totalUsersCount,
    pageCount: state.usersPage.pageCount
  }
}

let mapDispatchToProps = (dispatch: Dispatch<UsersPageActionType>): MapDispatchToPropsType => {
  return {
    updateFollow: (userId: number) => { //возможно надо удет исправить на string
      dispatch(UpdateFollowAC(userId))
    },
    setUsers: (users: UserType[]) => {
      dispatch(SetUsersAC(users))
    },
    setCurrentPage: (currentPage: number) => {
      dispatch(SetCurrentPageAC(currentPage))
    },
    setTotalUsersCount: (totalUsersCount: number) => {
      dispatch(SetTotalUsersCountAC(totalUsersCount))
    }
  }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPIComponent);