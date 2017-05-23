import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction, handleActions } from 'redux-actions';

// actions
export const fetchArticles = createAction('FETCH_ARTICLES');
export const fetchArticlesFulfilled = createAction('FETCH_ARTICLES_FULFILLED');

// epics
export const fetchArticlesEpic = action$ =>
  action$
    .ofType(String(fetchArticles))
    .mergeMap(action =>
      ajax
        .getJSON(`/api/articles`)
        .map(response => fetchArticlesFulfilled(response))
    );

// reducer
const defaultState = {
  articles: []
};

export default handleActions(
  {
    [fetchArticlesFulfilled]: (state, { payload: { data = [] } }) => ({
      ...state,
      articles: [...data]
    })
  },
  defaultState
);
