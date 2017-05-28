import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction, handleActions } from 'redux-actions';

import { channelId } from 'modules/channel';

// state
const defaultState = {
  loading: true,
  invalid: false,
  data: null
};

// actions
export const fetchArticles = createAction('FETCH_ARTICLES');
export const fetchArticlesFulfilled = createAction('FETCH_ARTICLES_FULFILLED');

// reducer
export default handleActions(
  {
    [fetchArticles]: () => ({ ...defaultState }),
    [fetchArticlesFulfilled]: {
      next: (state, { payload: { data = [] } }) => ({
        ...state,
        loading: false,
        invalid: false,
        data
      }),
      throw: state => ({ ...defaultState, loading: false, invalid: true })
    }
  },
  defaultState
);

// selectors
export const articlesData = state => state.articles.data;
export const articlesLoading = state => state.articles.loading;

// epics
export const fetchArticlesEpic = (action$, { getState }) =>
  action$
    .ofType(String(fetchArticles))
    .mergeMap(action =>
      ajax
        .getJSON(`/api/channels/${channelId(getState())}/articles`)
        .map(response => fetchArticlesFulfilled(response))
    );
