import { Component, useEffect, useRef } from "react";
import { AppRootStateType } from "../../../redux/redux-store";
import { Profile } from "./Profile";
import {
  UserProfileType,
  UserUpdatedProfileType,
  savePhotoTC,
  setProfileTC,
  setStatusTC,
  updateProfileTC,
  updateStatusTC,
} from "../modal/profile-reducer";
import { connect, useDispatch, useSelector } from "react-redux";
import { compose } from "redux";
import { RouteComponentProps, useHistory, useParams, withRouter } from "react-router-dom";
import { getAuthorizedUserId, getIsAuth } from "../../auth/model/auth-selectors";

type MapStateToPropsType = {
  profile: UserProfileType | null;
  status: string;
  isAuth: boolean;
  authorizedUserId: number | null;
  updateStatusSuccessful: boolean;
};

type MapDispatchToPropsType = {
  setProfile: (userId: number) => void;
  setStatus: (userId: number) => void;
  updateStatus: (status: string) => void;
  savePhoto: (photofile: any) => void;
  saveData: (data: UserUpdatedProfileType) => Promise<void>;
};

type PathParamsType = {
  userId: string;
};

type OnPropsType = MapStateToPropsType & MapDispatchToPropsType;
type ProfileContainerPropsType = RouteComponentProps<PathParamsType> &
  OnPropsType;

/////////////////////
type ProfileComponentType = {

}


export const ProfileComponent = (props: ProfileComponentType ) => {
  debugger
  const dispatch = useDispatch()
  const authorizedUserId = useSelector(getAuthorizedUserId)
  const params = useParams<{userId: undefined | string}>()
  let userId = params.userId
  let history = useHistory()
  let prevUserIdRef = useRef<string>()
  let prevUserId = prevUserIdRef.current
  const isAuth = useSelector(getIsAuth)

  const refreshProfile = () => {
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
  }

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
  }, [userId])

    return (
      <Profile
        {...props}
        /* isOwner={!this.props.match.params.userId} */
        isOwner={!userId}
      />
    );

}

class ProfileComponent2 extends Component<ProfileContainerPropsType> {
  refreshProfile() {
    let userId = this.props.match.params.userId;
    if (userId) {
      this.props.setProfile(+userId);
      this.props.setStatus(+userId);
    } else if (!userId && this.props.authorizedUserId) {
      userId = this.props.authorizedUserId.toString();
      this.props.setProfile(+userId);
      this.props.setStatus(+userId);
    } else {
      this.props.history.push("/login");
    }
  }

  componentDidMount(): void {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: ProfileContainerPropsType): void {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }

    if (!this.props.isAuth) {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <Profile
        {...this.props}
/*         status={this.props.status} */
/*         profile={this.props.profile} */
/*         updateStatus={this.props.updateStatus} */
        isOwner={!this.props.match.params.userId}
/*         savePhoto={this.props.savePhoto} */
/*         saveUpdatedData={this.props.saveData} */
/*         updateStatusSuccessful={this.props.updateStatusSuccessful}
 */      />
    );
  }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    isAuth: state.auth.isAuth,
    authorizedUserId: state.auth.userId,
    updateStatusSuccessful: state.profilePage.updateStatusSuccessful,
  };
};

export const ProfileContainer = compose<React.ComponentType>(
  connect(mapStateToProps, {
    setProfile: setProfileTC,
    setStatus: setStatusTC,
    updateStatus: updateStatusTC,
    savePhoto: savePhotoTC,
    saveData: updateProfileTC,
  }),
  withRouter
)(ProfileComponent);
