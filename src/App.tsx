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
import { ActionType, ContactType, DialogType, PostType, StateType, StoreType } from './redux/state';


type AppPropsType = {
  store: StoreType
  state: StateType
  /* addMessageToDialog: () => void;
  addPost: () => void
  updateNewPostText: (text: string) => void
  updateNewMessageText: (text: string) => void */
  dispatch: (action: ActionType) => void
}


const App: React.FC<AppPropsType> = (props) => { //поменять потом типы

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header/>
        <NavBar/>

        {/* render если передаем тег и пропсы, component - если ссылку на компоненту */}
        <Route path='/profile' render={() => <Profile
                                                    posts={props.state.profilePage.posts}
                                                    currentText={props.state.profilePage.currentText}
                                                    dispatch={props.dispatch}
                                                    user={props.store.user}
                                                    /* updateNewPostText={props.updateNewPostText}
                                                    addPost={props.addPost} */
                                                    />}/>
        <Route path={'/messages'} render={() => <Dialogs
                                                    dialogsData={props.state.dialogsPage}
                                                    dispatch={props.dispatch}
                                                    user={props.store.user}
                                                    messageContacts={props.store.messageContacts}
                                                    /* addMessageToDialog={props.addMessageToDialog}
                                                    updateNewMessageText={props.updateNewMessageText} */

                                                    />}/>

        <Route path='/news' component={News}/>
        <Route path='/music' component={Music}/>
        <Route path='/settings' component={Settings}/>
        <Route exact path='/' render={() => <Profile
                                                    posts={props.state.profilePage.posts}
                                                    currentText={props.state.profilePage.currentText}
                                                    dispatch={props.dispatch}
                                                    user={props.store.user}
                                                    /* updateNewPostText={props.updateNewPostText}
                                                    addPost={props.addPost} */
                                                    />}/>
      </div>
    </BrowserRouter>

  );
}

export default App;
