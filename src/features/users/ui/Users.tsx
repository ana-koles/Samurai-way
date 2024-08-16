import React, { useEffect } from "react";
import s from "./Users.module.css";
import { followUserTC, requestUsersTC, setCurrentPageAC, unfollowUserTC, UsersFilter } from "../model/users-reducer";
import { User } from "../user/ui/User";
import { Pagination } from "../../../components/common/pagination/Pagination";
import { SearchUsersForm } from "./SearchUsersForm";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPage, getIsFollowingInProgress, getPageCount, getTotalUsersCount, getUsers, getUsersFilter } from "../model/users-selectors";
import { useHistory } from "react-router-dom";

type UsersPropsType = {
};

export const Users = (props: UsersPropsType) => {
  const totalUsersCount = useSelector(getTotalUsersCount)
  const pageCount = useSelector(getPageCount)
  const currentPage = useSelector(getCurrentPage)
  const users = useSelector(getUsers)
  const isFollowingInProgressUsersId = useSelector(getIsFollowingInProgress)
  const filter = useSelector(getUsersFilter)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    const searcParams = new URLSearchParams()
    searcParams.set('term', `${filter.term}`)
    searcParams.set('friend', `${filter.friend}`)
    history.push({
      pathname: '/users',
      search: searcParams.toString()
    })

  }, [filter])

  useEffect(() => {
    dispatch(requestUsersTC(pageCount, currentPage, filter))
  }, [])

  const setCurrentPage = (currentPageNumber: number) => {
    dispatch(setCurrentPageAC(currentPageNumber));
    dispatch(requestUsersTC(pageCount, currentPageNumber, filter))
  };

  const followUser = (userId: number) => {
    dispatch(followUserTC(userId))
  }

  const unfollowUser = (userId: number) => {
    dispatch(unfollowUserTC(userId))
  }

  const changeUserSearchFilter = (filter: UsersFilter) => {
    dispatch(requestUsersTC(pageCount, 1, filter));
  }

  return (
    <div className={s.content}>
{/*       {isFetched && <Preloader />} */}

      <SearchUsersForm changeUserSearchFilter={changeUserSearchFilter}/>

      <Pagination
        totalItemsCount={totalUsersCount}
        pageCount={pageCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {users.map((user) => (
        <User
          key={user.id}
          user={user}
          isFollowingInProgressUsersId={isFollowingInProgressUsersId}
          followUser={followUser}
          unfollowUser={unfollowUser}
        />
      ))}
    </div>
  );
};
