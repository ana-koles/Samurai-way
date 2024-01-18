import React from 'react';
import './App.css';

import { Header } from './components/header/Header';
import { NavBar } from './components/navBar/NavBar';
import { Profile } from './components/profile/Profile';
import { Dialogs } from './components/dialogs/Dialogs';
import { News } from './components/news/News';
import { Music } from './components/music/Music';
import { Settings } from './components/settingsPage/Settings';
import { BrowserRouter, Route } from 'react-router-dom';
import { UsersContainer } from './components/users/UsersContainer';
import { ProfileContainer } from './components/profile/ProfileContainer';
import { HeaderContainer } from './components/header/HeaderComponent';


type AppPropsType = {
}


const App: React.FC<AppPropsType> = (props) => {

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
        <Route exact path='/' render={() => <ProfileContainer/>}/>
      </div>
    </BrowserRouter>

  );
}

export default App;
