import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from './reducer';
import Chat from './chat';

let store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    thunkMiddleware
  )
);

const appContainer = document.getElementById('app')

if (appContainer) {
  ReactDOM.render(
    <Provider store={store}>
      <Chat />
    </Provider>,
    appContainer
  );
}

window.moment = require('moment');
