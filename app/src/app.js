import 'phoenix_html';
import 'rxjs';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'app.css';

import App from 'components/App';
import { store } from 'modules/store';

const render = () =>
  ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('app')
  );

render();

store.subscribe(render);
