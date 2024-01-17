import { Component } from "react";
import { AppRootStateType } from "../../redux/redux-store";
import { Profile } from "./Profile";
import axios from "axios";
import { ProfileReducerActionType, UserProfile, setProfileAC } from "../../redux/profile-reducer";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

type MapStateToPropsType = {
  profile: UserProfile | null
}

type MapDispatchToPropsType = {
  setProfile: (userProfile: UserProfile) => void
}

//типизация useID
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

    axios.get('https://social-network.samuraijs.com/api/1.0/profile/' + +userId)
      .then((res) => this.props.setProfile(res.data))
  }

  render() {
    return (
      <Profile {...this.props}/>
    )
  }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {

  return {
    profile: state.profilePage.profile
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ProfileReducerActionType>): MapDispatchToPropsType => {
    return {
      setProfile: (userProfile: UserProfile) => { //возможно надо удет исправить на string
      dispatch(setProfileAC(userProfile))
    }
  }
}

//тоже вернет новую компоненту, по факту тоже отрисуется ProfileComponent и закинутся данные из URL
const ProfileComponentWithURLData = withRouter(ProfileComponent);

//connect вернет новую компоненту, по факту отрисуется ProfileComponent и закинет данные из store
export const ProfileContainer = connect(mapStateToProps, {setProfile: setProfileAC})(ProfileComponentWithURLData)

