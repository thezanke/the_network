import 'phoenix_html';
import 'rxjs';

import React from 'react';
import logger from 'redux-logger';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import 'app.css';

import App from 'components/App';
import { rootEpic, rootReducer } from 'modules/root';

const epicMiddleware = createEpicMiddleware(rootEpic);
const store = createStore(rootReducer, applyMiddleware(logger, epicMiddleware));

const renderApp = () =>
  render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('app')
  );

renderApp();

store.subscribe(renderApp);
