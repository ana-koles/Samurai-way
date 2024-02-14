import { AppRootStateType } from "./redux-store";

export const getUsers = (state: AppRootStateType) => {
  return state.usersPage.users
};

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
  return state.usersPage.isFollowingInProgress
}