import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { addMessageToDialog, state } from './redux/state';



ReactDOM.render(
    <App appState={state} addMessageToDialog={addMessageToDialog}/>,
  document.getElementById('root')
);