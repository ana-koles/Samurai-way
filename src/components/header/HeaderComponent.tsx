import { connect } from "react-redux";
import { Header } from "./Header";
import { AppRootStateType } from "../../redux/redux-store";
import { Component } from "react";
import { getAuthUserDataTC} from "../../redux/auth-reducer";
import { UserProfileType } from "../../redux/profile-reducer";


export type UserDataType = {
  id: number | null,
  email: string | null,
  login: string | null
  isAuth: boolean
}

type MapStateToProps = {
  login: string | null
  isAuth: boolean
/*   profile: UserProfileType | null */
}

type MapDispatchToPropsType = {
  getAuthUserData: () => void
}

type HeaderContainerPropsType = MapStateToProps & MapDispatchToPropsType

class HeaderComponent extends Component<HeaderContainerPropsType> {

  componentDidMount(): void {
    this.props.getAuthUserData()
  }

  render () {
    return <Header {...this.props}/>
  }
}

const mapStateToProps = (state: AppRootStateType): MapStateToProps => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
   /*  profile: state.profilePage.profile */
  }
}

export const HeaderContainer = connect(mapStateToProps, {getAuthUserData:getAuthUserDataTC })(HeaderComponent)