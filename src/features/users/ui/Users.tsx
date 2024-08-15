import React from "react";
import s from "./Users.module.css";
import { UserSearchFilterType, UserType } from "../model/users-reducer";
import { Preloader } from "../../../components/common/preloader/Preloader";
import { User } from "../user/ui/User";
import { Pagination } from "../../../components/common/pagination/Pagination";
import { SearchUsersForm } from "./SearchUsersForm";
import { useSelector } from "react-redux";
import { getCurrentPage, getIsFetched, getIsFollowingInProgress, getPageCount, getTotalUsersCount, getUsers } from "../model/users-selectors";

type UsersPropsType = {
  setCurrentPage: (pageNumber: number) => void;
  followUser: (userId: number) => void;
  unfollowUser: (userId: number) => void;
  changeUserSearchFilter: (filter: UserSearchFilterType) => void
};

export const Users = (props: UsersPropsType) => {
  const totalUsersCount = useSelector(getTotalUsersCount)
  const pageCount = useSelector(getPageCount)
  const currentPage = useSelector(getCurrentPage)
  const users = useSelector(getUsers)
  const isFetched = useSelector(getIsFetched)
  const isFollowingInProgressUsersId = useSelector(getIsFollowingInProgress)

  return (
    <div className={s.content}>
      {isFetched ? <Preloader /> : ""}

      <SearchUsersForm changeUserSearchFilter={props.changeUserSearchFilter}/>

      <Pagination
        totalItemsCount={totalUsersCount}
        pageCount={pageCount}
        currentPage={currentPage}
        setCurrentPage={props.setCurrentPage}
      />

      {users.map((user) => (
        <User
          key={user.id}
          user={user}
          isFollowingInProgressUsersId={isFollowingInProgressUsersId}
          followUser={props.followUser}
          unfollowUser={props.unfollowUser}
        />
      ))}
    </div>
  );
};
