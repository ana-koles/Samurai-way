import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './redux/redux-store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';



export const rerenderEntireTree = () => {
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <App
          /* state={stateNew}
          store={store}
          dispatch={store.dispatch.bind(store)} */
          />,
      </Provider>,
    </BrowserRouter>,


    document.getElementById('root')
  );
}


rerenderEntireTree();

/* store.subscribe(() => {
  rerenderEntireTree();
}); //передаем rerenderEntireTree в качестве callback */

