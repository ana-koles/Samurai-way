import { connect } from "react-redux";
import { AppRootStateType } from "../../../redux/redux-store";
import {
  setCurrentPageAC,
  UserType,
  requestUsersTC,
  followUserTC,
  unfollowUserTC,
  UserSearchFilterType,
} from "../model/users-reducer";
import { Component } from "react";
import { Users } from "./Users";
import {
  getCurrentPage,
  getIsFetched,
  getIsFollowingInProgress,
  getPageCount,
  getTotalUsersCount,
  getUsers,
} from "../model/users-selectors";

type MapStateToPropsType = {
  users: UserType[];
  currentPage: number;
  totalUsersCount: number;
  pageCount: number;
  isFetched: boolean;
  isFollowingInProgressUsersId: Array<number>;
};

type MapDispatchToPropsType = {
  setCurrentPage: (currentPage: number) => void;
  getUsers: (pageCount: number, currentPage: number, term: string) => void;
  followUser: (userId: number) => void;
  unfollowUser: (userId: number) => void;
};

export type UsersContainerPropsType = MapDispatchToPropsType &
  MapStateToPropsType;

class UsersComponent extends Component<UsersContainerPropsType> {

  componentDidMount(): void {
    this.props.getUsers(this.props.pageCount, this.props.currentPage, '');
  }

  setCurrentPage = (currentPageNumber: number) => {
    this.props.setCurrentPage(currentPageNumber);
    this.props.getUsers(this.props.pageCount, currentPageNumber, '');
  };

  changeUserSearchFilter = (term: UserSearchFilterType) => {
    console.log('user', term.term);
    this.props.getUsers(this.props.pageCount, this.props.currentPage, term.term);
  }

  render() {

    return (
      <Users
        totalUsersCount={this.props.totalUsersCount}
        pageCount={this.props.pageCount}
        currentPage={this.props.currentPage}
        users={this.props.users}
        setCurrentPage={this.setCurrentPage}
        isFetched={this.props.isFetched}
        isFollowingInProgressUsersId={this.props.isFollowingInProgressUsersId}
        followUser={this.props.followUser}
        unfollowUser={this.props.unfollowUser}
        changeUserSearchFilter={this.changeUserSearchFilter}
      />
    );
  }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
  return {
    users: getUsers(state),
    currentPage: getCurrentPage(state),
    totalUsersCount: getTotalUsersCount(state),
    pageCount: getPageCount(state),
    isFetched: getIsFetched(state),
    isFollowingInProgressUsersId: getIsFollowingInProgress(state),
  };
};


export const UsersContainer = connect(mapStateToProps, {
  setCurrentPage: setCurrentPageAC,
  getUsers: requestUsersTC,
  followUser: followUserTC,
  unfollowUser: unfollowUserTC,
})(UsersComponent);

export default UsersContainer;
