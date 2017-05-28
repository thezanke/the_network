import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';

import articles, { fetchArticlesEpic } from './articles';
import channel, { fetchChannelEpic } from './channel';
import comments, { fetchCommentsEpic } from './comments';

export const rootEpic = combineEpics(
  fetchArticlesEpic,
  fetchChannelEpic,
  fetchCommentsEpic
);

export const rootReducer = combineReducers({ articles, channel, comments });
