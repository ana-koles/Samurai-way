import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StateType, addMessageToDialog, addPost, state } from './redux/state';




export const rerenderEntireTree = (state: StateType) => {
  ReactDOM.render(
    <App
        appState={state}
        addMessageToDialog={addMessageToDialog}
        addPost={addPost}/>,
        document.getElementById('root')
  );
}

