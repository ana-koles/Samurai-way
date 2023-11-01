import React from 'react';
import './App.css';

import { Header } from './components/header/Header';
import { NavBar } from './components/navBar/NavBar';
import { Profile } from './components/profile/Profile';
import { Dialogs } from './components/dialogs/Dialogs';

const App = () => {
  return (
    <div className="app-wrapper">
      <Header/>
      <NavBar/>
{/*       <Profile/> */}
      <Dialogs/>
    </div>
  );
}

export default App;
