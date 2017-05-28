import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction, handleActions } from 'redux-actions';

import { getChannelId } from 'modules/channel';

// state
const defaultState = {
  loading: true,
  invalid: false,
  articleId: null,
  data: []
};

// actions
export const fetchComments = createAction('FETCH_COMMENTS');
export const fetchCommentsFulfilled = createAction('FETCH_COMMENTS_FULFILLED');

// reducer
export default handleActions(
  {
    [fetchComments]: (state, { payload }) => {
      const articleId = parseInt(payload, 10);
      return {
        ...defaultState,
        invalid: Number.isNaN(articleId),
        articleId
      };
    },
    [fetchCommentsFulfilled]: (state, { payload: { data } }) => ({
      ...state,
      loading: false,
      data
    })
  },
  defaultState
);

// selectors
export const getArticleId = state => state.comments.articleId;
export const commentsData = state => state.comments.data;
export const commentsLoading = state => state.comments.loading;

// epics
export const fetchCommentsEpic = (action$, { getState }) =>
  action$.ofType(String(fetchComments)).mergeMap(action => {
    const state = getState();
    const channelId = getChannelId(state);
    const articleId = getArticleId(state);

    return ajax
      .getJSON(`/api/channels/${channelId}/articles/${articleId}/comments`)
      .map(response => fetchCommentsFulfilled(response));
  });
