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
import { ActionType, ContactType, DialogType, PostType, StateType, StoreType } from './redux/store';


type AppPropsType = {
}


const App: React.FC<AppPropsType> = (props) => { 

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header/>
        <NavBar/>

        {/* render если передаем тег и пропсы, component - если ссылку на компоненту */}
        <Route path='/profile' render={() => <Profile /* store={props.store} *//>}/>
        <Route path={'/messages'} render={() => <Dialogs /* store={props.store} */ />}/>

        <Route path='/news' component={News}/>
        <Route path='/music' component={Music}/>
        <Route path='/settings' component={Settings}/>
        <Route exact path='/' render={() => <Profile/>}/>
      </div>
    </BrowserRouter>

  );
}

export default App;
