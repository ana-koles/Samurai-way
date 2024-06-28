import { ComponentType } from "react";
import { Redirect } from "react-router-dom";
import { AppRootStateType } from "../redux/redux-store";
import { connect } from "react-redux";

type MapStateToPropsType = {
  isAuth: boolean
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
  return {
    isAuth: state.auth.isAuth
  }
}

export function withAuthRedirect<T>(ComponentForRedirect: ComponentType<T>) {

  const RedirectComponent = (props: MapStateToPropsType) => {
    let {isAuth, ...restProps} = props;

    if (!isAuth) {
      return <Redirect to='/login'/>
    }
    return <ComponentForRedirect {...restProps as T & {}}/>
  }

  const  ConnectedRedirectComponent = connect(mapStateToProps)(RedirectComponent)

  return ConnectedRedirectComponent;
}