import { createAction, handleActions } from 'redux-actions';

// state
const defaultState = {
  loading: true,
  invalid: false,
  articleId: null,
  data: null
};

// actions
const fetchComments = createAction('FETCH_COMMENTS');

// reducer
export default handleActions(
  {
    [fetchComments]: (state, { payload }) => {
      const articleId = parseInt(payload, 10);
      const nextState = {
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
export const commentsData = state => state.comments.data;
export const commentsLoading = state => state.comments.loading;

// epics
export const fetchCommentsEpic = action$ =>
  action$
    .ofType(String(fetchComments))
    .mergeMap(action =>
      ajax
        .getJSON(`/api/channels/${action.payload}/articles`)
        .map(response => fetchArticlesFulfilled(response))
    );
