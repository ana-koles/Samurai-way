import React, { Component, Suspense, lazy } from 'react';
import './App.css';
import { NavBar } from './components/navBar/NavBar';
import { News } from './components/news/News';
import { Music } from './components/music/Music';
import { Settings } from './components/settingsPage/Settings';
import { BrowserRouter, HashRouter, Route, withRouter } from 'react-router-dom';
import { ProfileContainer } from './components/profile/ProfileContainer';
import { HeaderContainer } from './components/header/HeaderComponent';
import { LoginPageContainer } from './components/login/Login';
import { compose } from 'redux';
import { Provider, connect } from 'react-redux';
import { setInitializeAppTC } from './redux/app-reducer';
import { AppRootStateType, store } from './redux/redux-store';
import { Preloader } from './components/common/Preloader';

//lazy loading
//import { UsersContainer } from './components/users/UsersContainer';
const UsersContainer = lazy(() => import('./components/users/UsersContainer'))

//import { Dialogs } from './components/dialogs/Dialogs';
const Dialogs = lazy(() => import('./components/dialogs/Dialogs'))


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
          <Route path={'/messages'} render={() => {
            return <Suspense fallback={<Preloader />}>
                      <Dialogs/>
                  </Suspense>

          }}/>

          <Route path='/news' component={News}/>
          <Route path='/music' component={Music}/>
          <Route path='/settings' component={Settings}/>

          <Route path='/users' render={() => {
            return<Suspense fallback={<Preloader />}>
                      <UsersContainer/>
                  </Suspense>
          }}/>

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


const AppContainer =  compose<React.ComponentType>(
  withRouter,
  connect(MapStateToProps, {setInitializeApp: setInitializeAppTC}) //если не передаем MapStateToProps, то вмест них пишем Null
)(App);

const MainApp = () => {
  return <BrowserRouter basename={process.env.PUBLIC_URL}> {/* чтобы на gh-pages переключаться по страницам */}
          <Provider store={store}>
            <AppContainer/>
          </Provider>,
        </BrowserRouter>
}

export default MainApp


