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

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header/>
        <NavBar/>

        <Route path='/profile' component={Profile}/>
        <Route exact path='/messages'component={Dialogs}/>
        <Route path='/news' component={News}/>
        <Route path='/music' component={Music}/>
        <Route path='/settings' component={Settings}/>
        {/* <Profile/>
        <Dialogs/>
        <News/>
        <Music/>
        <Settings/> */}
      </div>
    </BrowserRouter>

  );
}

export default App;
