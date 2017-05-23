import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction, handleActions } from 'redux-actions';

import { createChannel } from 'modules/socket';

export const fetchArticles = createAction('FETCH_ARTICLES');
export const fetchArticlesFulfilled = createAction('FETCH_ARTICLES_FULFILLED');

const articlesChannel = createChannel('articles:rank');

articlesChannel
  .join()
  .receive('ok', resp => {
    console.log('Joined successfully', resp);
  })
  .receive('error', resp => {
    console.log('Unable to join', resp);
  });

export const fetchArticlesEpic = action$ =>
  action$
    .ofType(String(fetchArticles))
    .mergeMap(action =>
      ajax
        .getJSON(`/api/articles`)
        .map(response => fetchArticlesFulfilled(response))
    );

const defaultState = {
  articles: []
};

export default handleActions(
  {
    [fetchArticlesFulfilled]: (state, { payload: { data } }) => ({
      ...state,
      articles: [...data]
    })
  },
  defaultState
);
