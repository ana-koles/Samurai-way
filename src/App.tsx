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
import { ContactType, DialogType, dialogs, messageContacts } from './data/dialogs';
import { PostType } from './data/posts';



type AppPropsType = {
  posts: PostType[]
  dialogs: DialogType
  messageContacts: ContactType[]
}

const App: React.FC<AppPropsType> = (props) => {

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header/>
        <NavBar/>

        <Route path='/profile' render={() => <Profile posts={props.posts} />}/>
        <Route path={'/messages'} render={() => <Dialogs dialogs={props.dialogs}/>}/>

        <Route path='/news' component={News}/>
        <Route path='/music' component={Music}/>
        <Route path='/settings' component={Settings}/>
        <Route exact path='/' render={() => <Profile posts={props.posts} />}/>
      </div>
    </BrowserRouter>

  );
}

export default App;
