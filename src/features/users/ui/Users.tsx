import React from "react";
import s from "./Users.module.css";
import { UserType } from "../model/users-reducer";
import { Preloader } from "../../../components/common/preloader/Preloader";
import { User } from "../user/ui/User";
import { Pagination } from "../../../components/common/pagination/Pagination";
import { SearchUsersForm } from "./SearchUsersForm";

type UsersPropsType = {
  totalUsersCount: number;
  pageCount: number;
  currentPage: number;
  users: UserType[];
  isFetched: boolean;
  isFollowingInProgressUsersId: Array<number>;
  setCurrentPage: (pageNumber: number) => void;
  followUser: (userId: number) => void;
  unfollowUser: (userId: number) => void;
  getUsers: (pageCount: number, currentPage: number, term: string) => void;
};

export const Users = (props: UsersPropsType) => {
  return (
    <div className={s.content}>
      {props.isFetched ? <Preloader /> : ""}

      <SearchUsersForm/>

      <Pagination
        totalItemsCount={props.totalUsersCount}
        pageCount={props.pageCount}
        currentPage={props.currentPage}
        setCurrentPage={props.setCurrentPage}
      />

      {props.users.map((user) => (
        <User
          key={user.id}
          user={user}
          isFollowingInProgressUsersId={props.isFollowingInProgressUsersId}
          followUser={props.followUser}
          unfollowUser={props.unfollowUser}
        />
      ))}
    </div>
  );
};
