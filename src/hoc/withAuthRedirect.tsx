import { Component, ComponentType } from "react";
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

//создаем контейнерную компоненту и возвращаем ее
export function withAuthRedirect<T>(ComponentForRedirect: ComponentType<T>) {

  const RedirectComponent = (props: MapStateToPropsType) => { //приходит компонента с пропсами с типами MapStateToPropsType
                                                          //потому что мы законнектили ее (см ниже)
    let {isAuth, ...restProps} = props; //здесь будут пропсы от ComponentForRedirect +  MapStateToPropsType
    console.log(isAuth)
    if (!isAuth) { //if user is not authorized, redirect to Login page
      return <Redirect to='/login'/>
    }
    return <ComponentForRedirect {...restProps as T & {}}/> //должны прокинуть все пропсы, с к-ыми эта компонента пришла,
                                                          // т.е. без isAuth уже
  }

  //коннектим mapStateToPropsForRedirect => создаем контейнерную компоненту над RedirectComponent и прокидываем в нее пропсы
  const  ConnectedRedirectComponent = connect(mapStateToProps)(RedirectComponent)

  return ConnectedRedirectComponent;
}