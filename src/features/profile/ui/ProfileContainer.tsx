import { useCallback, useEffect, useRef } from "react";
import { Profile } from "./Profile";
import {
  setProfileTC,
  setStatusTC,
} from "../modal/profile-reducer";
import { useHistory, useParams } from "react-router-dom";
import { selectAuthorizedUserId, selectIsAuth } from "../../auth/model/auth-selectors";
import { useDispatch, useSelector } from "react-redux";

type ProfileComponentType = {

}


export const ProfileContainer = (props: ProfileComponentType ) => {
  const dispatch = useDispatch()
  const authorizedUserId = useSelector(selectAuthorizedUserId)
  const params = useParams<{userId: undefined | string}>()
  let userId = params.userId
  let history = useHistory()
  let prevUserIdRef = useRef<string>()
  let prevUserId = prevUserIdRef.current
  const isAuth = useSelector(selectIsAuth)

  const refreshProfile = useCallback(() => {
    if (userId) {
      dispatch(setProfileTC(+userId))
      dispatch(setStatusTC(+userId))
    } else if (!userId && authorizedUserId) {
      userId = authorizedUserId.toString();
      dispatch(setProfileTC(+userId))
      dispatch(setStatusTC(+userId))
    } else if  (!isAuth){
      history.push("/login");
    }
  }, [userId])

  useEffect(() => {
    refreshProfile()
  }, [])

  useEffect(() => {
    if (userId !== prevUserId) {
      refreshProfile();
    }

    if (!isAuth) {
      history.push("/login");
    }
    refreshProfile()
  }, [userId, isAuth, prevUserId, refreshProfile])

    return (
      <Profile
        {...props}
        isOwner={!userId}
      />
    );

}
