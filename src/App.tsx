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
import { ContactType, DialogType, PostType } from './redux/state';


type AppPropsType = {
  appState: {
    profilePage:{
      posts: PostType[]
    },
    dialogsPage: {
      messageContacts: ContactType[],
      dialogs: DialogType
    }
  }
}

const App: React.FC<AppPropsType> = (props) => {

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header/>
        <NavBar/>

        {/* render если передаем тег и пропсы, component - если ссылку на компоненту */}
        <Route path='/profile' render={() => <Profile posts={props.appState.profilePage.posts} />}/>
        <Route path={'/messages'} render={() => <Dialogs dialogsData={props.appState.dialogsPage}/>}/>

        <Route path='/news' component={News}/>
        <Route path='/music' component={Music}/>
        <Route path='/settings' component={Settings}/>
        <Route exact path='/' render={() => <Profile posts={props.appState.profilePage.posts} />}/>
      </div>
    </BrowserRouter>

  );
}

export default App;
