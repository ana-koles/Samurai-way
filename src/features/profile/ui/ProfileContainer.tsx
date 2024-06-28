import { Component } from "react";
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
import { connect } from "react-redux";
import { compose } from "redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

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

class ProfileComponent extends Component<ProfileContainerPropsType> {
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
        status={this.props.status}
        profile={this.props.profile}
        updateStatus={this.props.updateStatus}
        isOwner={!this.props.match.params.userId}
        savePhoto={this.props.savePhoto}
        saveUpdatedData={this.props.saveData}
        updateStatusSuccessful={this.props.updateStatusSuccessful}
      />
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
