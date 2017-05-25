import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';

import articles, { fetchArticlesEpic } from './articles';
import channel, { fetchChannelEpic } from './channel';

export const rootEpic = combineEpics(fetchArticlesEpic, fetchChannelEpic);

export const rootReducer = combineReducers({ articles, channel });
