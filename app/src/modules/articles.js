import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

export const fetchArticles = createAction('FETCH_ARTICLES');
export const fetchArticlesFulfilled = createAction('FETCH_ARTICLES_FULFILLED');

export const fetchArticlesEpic = action$ =>
  action$
    .ofType(String(fetchArticles))
    .mergeMap(action =>
      ajax
        .getJSON(`/api/articles`)
        .map(response => fetchArticlesFulfilled(response))
    );

export default () => ({});
