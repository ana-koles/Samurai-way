import { Component } from "react";
import { AppRootStateType } from "../../redux/redux-store";
import { Profile } from "./Profile";
import axios from "axios";
import { ProfileReducerActionType, UserProfileType, setProfileAC, setProfileTC } from "../../redux/profile-reducer";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

type MapStateToPropsType = {
  profile: UserProfileType | null
}

type MapDispatchToPropsType = {
  setProfile: (userId: number) => void
}

//типизация userID
type PathParamsType = {
  userId: string,
}

type OnPropsType = MapStateToPropsType & MapDispatchToPropsType;
type ProfileContainerPropsType = RouteComponentProps<PathParamsType> & OnPropsType;

class ProfileComponent extends Component<ProfileContainerPropsType> {
  componentDidMount(): void {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = '2';
    }

    this.props.setProfile(+userId)
  }

  render() {
    return (
      <Profile {...this.props}/>
    )
  }
}

//создаем контейнерную компоненту над ProfileComponent (по факту возвращаем 2 контейнерные компоненты над ProfileComponent)
const  AuthRedirectComponent = withAuthRedirect(ProfileComponent);

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
  return {
    profile: state.profilePage.profile,
  }
}

/* const mapDispatchToProps = (dispatch: Dispatch<ProfileReducerActionType>): MapDispatchToPropsType => {
    return {
      setProfile: (userProfile: UserProfileType) => { //возможно надо удет исправить на string
      dispatch(setProfileAC(userProfile))
    }
  }
} */

//тоже вернет новую компоненту, по факту тоже отрисуется ProfileComponent и закинутся данные из URL
const ProfileComponentWithURLData = withRouter(AuthRedirectComponent);

//connect вернет новую компоненту, по факту отрисуется ProfileComponent и закинет данные из store
export const ProfileContainer = connect(mapStateToProps, {setProfile: setProfileTC})(ProfileComponentWithURLData)

