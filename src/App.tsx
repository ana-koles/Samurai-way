import React, { Component } from 'react';
import './App.css';

import { Header } from './components/header/Header';
import { NavBar } from './components/navBar/NavBar';
import { Profile } from './components/profile/Profile';
import { Dialogs } from './components/dialogs/Dialogs';
import { News } from './components/news/News';
import { Music } from './components/music/Music';
import { Settings } from './components/settingsPage/Settings';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import { UsersContainer } from './components/users/UsersContainer';
import { ProfileContainer } from './components/profile/ProfileContainer';
import { HeaderContainer } from './components/header/HeaderComponent';
import { LoginPageContainer } from './components/login/Login';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setInitializeAppTC } from './redux/app-reducer';
import { AppRootStateType } from './redux/redux-store';
import { Preloader } from './components/common/Preloader';


type MapDispatchToPropsType = {
  setInitializeApp: () => void
}

type MapStateToPropsType = {
  isInitialized: boolean
}

type AppPropsType = MapDispatchToPropsType & MapStateToPropsType

class App extends Component<AppPropsType> {

  componentDidMount(): void {
    this.props.setInitializeApp()
  }


  render(): React.ReactNode {

    if (!this.props.isInitialized) {
      return <Preloader/>
    }

    return (
      <BrowserRouter>
        <div className="app-wrapper">
          <HeaderContainer/>
          <NavBar/>

          {/* render если передаем тег и пропсы, component - если ссылку на компоненту */}
         {/*  Добавляем params для profile  */}
          <Route path='/profile/:userId?' render={() => <ProfileContainer /* store={props.store} *//>}/>
          <Route path={'/messages'} render={() => <Dialogs /* store={props.store} */ />}/>
          <Route path='/news' component={News}/>
          <Route path='/music' component={Music}/>
          <Route path='/settings' component={Settings}/>
          <Route path='/users' component={UsersContainer}/>
          <Route path='/login' component={LoginPageContainer}/>
          <Route exact path='/' render={() => <ProfileContainer/>}/>
        </div>
      </BrowserRouter>

    );

  }
}

const MapStateToProps = (state: AppRootStateType) => {
  return {isInitialized: state.app.isInitialized}
}


export default compose<React.ComponentType>(
  withRouter,
  connect(MapStateToProps, {setInitializeApp: setInitializeAppTC}) //если не передаем MapStateToProps, то вмест них пишем Null
)(App);


