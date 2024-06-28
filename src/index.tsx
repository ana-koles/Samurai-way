import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainApp from './App';

export const rerenderEntireTree = () => {
  ReactDOM.render(<MainApp/>, document.getElementById('root'));
}

rerenderEntireTree();

