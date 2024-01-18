import { connect } from "react-redux";
import { Header } from "./Header";
import { AppRootStateType } from "../../redux/redux-store";
import { Component } from "react";
import { setAuthUserData } from "../../redux/auth-reducer";
import axios from "axios";
import { UserProfile, setProfileAC } from "../../redux/profile-reducer";

export type UserDataType = {
  id: number | null,
  email: string | null,
  login: string | null
  isAuth: boolean
}

type MapStateToProps = {
  login: string | null
  isAuth: boolean
  profile: UserProfile | null
}

type MapDispatchToPropsType = {
  setAuthUserData: (userId: number | null, email: string|null, login: string|null) => void
  setProfile: (userProfile: UserProfile) => void
}

type HeaderContainerPropsType = MapStateToProps & MapDispatchToPropsType

class HeaderComponent extends Component<HeaderContainerPropsType> {

/*   withCredentials: true используется для включения передачи куки (cookies) вместе с запросом.
Это особенно важно, когда вы обращаетесь к серверу с использованием кросс-доменных запросов
(CORS - Cross-Origin Resource Sharing).*/
  componentDidMount(): void {
    axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {withCredentials: true})
      .then(res => {
        debugger;
        if (res.data.resultCode === 0) {
          let {id, email, login} = res.data.data;
          this.props.setAuthUserData(id, email, login);

          axios.get('https://social-network.samuraijs.com/api/1.0/profile/' + id)
          .then((res) => this.props.setProfile(res.data))
        }
      })
  }

  render () {
    return <Header {...this.props}/>
  }
}

const mapStateToProps = (state: AppRootStateType): MapStateToProps => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    profile: state.profilePage.profile
  }
}

export const HeaderContainer = connect(mapStateToProps, {setAuthUserData, setProfile: setProfileAC})(HeaderComponent)