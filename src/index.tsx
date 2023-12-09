import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StateType, store} from './redux/state';




export const rerenderEntireTree = (stateNew: StateType) => {
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

store.subscribe(rerenderEntireTree); //передаем rerenderEntireTree в качестве callback