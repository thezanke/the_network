import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';

import { rootEpic, rootReducer } from './root';

const PROD = process.env.NODE_ENV === 'production';
const middleware = [];

/* redux-logger */
if (!PROD) middleware.push(createLogger({ collapsed: true }));

/* redux-observable */
const epicMiddleware = createEpicMiddleware(rootEpic);
middleware.push(epicMiddleware);

export const store = createStore(rootReducer, applyMiddleware(...middleware));
