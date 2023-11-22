import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { posts } from './data/posts';
import { dialogs, messageContacts } from './data/dialogs';

ReactDOM.render(
    <App posts={posts} dialogs={dialogs} messageContacts={messageContacts}/>,
  document.getElementById('root')
);