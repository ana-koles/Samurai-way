import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppRootStateType, store } from './redux/redux-store';



export const rerenderEntireTree = (stateNew: AppRootStateType) => {
  ReactDOM.render(
    <App
        state={stateNew}
        store={store}
        /* addMessageToDialog={store.addMessageToDialog.bind(store)} */
        dispatch={store.dispatch.bind(store)}
       /*  addPost={store.addPost.bind(store)}
        updateNewPostText={store.updateNewPostText.bind(store)}
        updateNewMessageText={store.updateNewMessageText.bind(store)} */
        />,
        document.getElementById('root')
  );
}


rerenderEntireTree(store.getState());

store.subscribe(() => {
  let state = store.getState();
  rerenderEntireTree(state);
}); //передаем rerenderEntireTree в качестве callback