import React, { useCallback, useEffect } from "react";
import s from "./Users.module.css";
import { followUserTC, requestUsersTC, setCurrentPageAC, unfollowUserTC, UsersFilter } from "../model/users-reducer";
import { User } from "../user/ui/User";
import { Pagination } from "../../../components/common/pagination/Pagination";
import { SearchUsersForm } from "./SearchUsersForm";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPage, getIsFollowingInProgress, getPageCount, getTotalUsersCount, getUsers, getUsersFilter } from "../model/users-selectors";
import { useHistory, useLocation } from "react-router-dom";

type UsersPropsType = {
};

export const Users = (props: UsersPropsType) => {
  console.log('Users component')
  const totalUsersCount = useSelector(getTotalUsersCount)
  const pageCount = useSelector(getPageCount)
  const currentPage = useSelector(getCurrentPage)
  const users = useSelector(getUsers)
  const isFollowingInProgressUsersId = useSelector(getIsFollowingInProgress)
  const filter = useSelector(getUsersFilter)
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    console.log('first useEffect')
    const search = new URLSearchParams(location.search)
    let friendParam = search.get('friend')
    let actualFriendParam = friendParam === 'all' ? null : friendParam === 'true' ? true : friendParam === 'false' ? false : filter.friend

    let pageParam = search.get('page') ? Number(search.get('page')) : currentPage
    let termParam = search.get('term')

    if (termParam === null) {
      termParam = filter.term
    }

    dispatch(requestUsersTC(pageCount, pageParam , {term: termParam, friend: actualFriendParam}))
  }, [])

  useEffect(() => {
    console.log('second useEffect')
    const searchParams = new URLSearchParams()
    if(!!filter.term) searchParams.set('term', `${filter.term}`)
/*     searchParams.set('term', `${filter.term}`) */
    if(filter.friend === null) {
      searchParams.set('friend', `all`)
    } else {
      searchParams.set('friend', `${filter.friend}`)
    }
/*     searchParams.set('friend', `${filter.friend}`) */
    searchParams.set('page', `${currentPage}`)
    history.push({
      pathname: '/users',
      search: searchParams.toString()
    })
  }, [filter, currentPage, history])

  const setCurrentPage = useCallback((currentPageNumber: number) => {
    dispatch(setCurrentPageAC(currentPageNumber));
    dispatch(requestUsersTC(pageCount, currentPageNumber, filter))
  }, [pageCount, filter, dispatch]);

  const followUser = (userId: number) => {
    dispatch(followUserTC(userId))
  }

  const unfollowUser = (userId: number) => {
    dispatch(unfollowUserTC(userId))
  }

  const changeUserSearchFilter = useCallback((filter: UsersFilter) => {
    dispatch(requestUsersTC(pageCount, 1, filter));
  }, [pageCount, dispatch])

  return (
    <div className={s.content}>
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
