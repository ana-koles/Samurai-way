import { createSelector } from "reselect";
import { AppRootStateType } from "../../../redux/redux-store";

const getUsersSelector = (state: AppRootStateType) => {
  return state.usersPage.users
};

// если у нас несколько зависимостей
// const getUsers = createSelector(getUsersSelect, isFetched, (users, isFetched) => {
  //return users.filter(u => u.lenght > 1)
//})

export const getUsers = createSelector(getUsersSelector, (users) => { //getUsers - все еще селектор
  return users.filter(u => true)
});

export const getCurrentPage = (state: AppRootStateType) => {
  return state.usersPage.currentPage
}

export const getTotalUsersCount = (state: AppRootStateType) => {
  return state.usersPage.totalUsersCount
}

export const getPageCount = (state: AppRootStateType) => {
  return state.usersPage.pageCount
}

export const getIsFetched = (state: AppRootStateType) => {
  return state.usersPage.isFetched
}

export const getIsFollowingInProgress = (state: AppRootStateType) => {
  return state.usersPage.isFollowingInProgressUsersId
}