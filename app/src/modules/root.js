import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';

import articles, { fetchArticlesEpic } from './articles';

export const rootEpic = combineEpics(fetchArticlesEpic);

export const rootReducer = combineReducers({ articles });
