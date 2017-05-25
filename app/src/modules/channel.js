import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs';
import { createAction, handleActions } from 'redux-actions';

// actions
export const fetchChannel = createAction('FETCH_CHANNEL');
export const fetchChannelFulfilled = createAction('FETCH_CHANNEL_FULFILLED');

// reducer
const defaultState = {
  loading: true,
  invalid: false,
  data: null
};

export default handleActions(
  {
    [fetchChannel]: () => ({ ...defaultState }),
    [fetchChannelFulfilled]: {
      next: (state, { payload: { data } }) => ({ ...state, data }),
      throw: (state, action) => ({
        ...defaultState,
        loading: false,
        invalid: true
      })
    }
  },
  defaultState
);

// selectors
export const channelData = state => state.channel.data;
export const channelLoading = state => state.channel.loading;

// epics
export const fetchChannelEpic = action$ =>
  action$
    .ofType(String(fetchChannel))
    .mergeMap(action =>
      ajax
        .getJSON(`/api/channels/${action.payload}`)
        .map(response => fetchChannelFulfilled(response))
        .catch(error => Observable.of(fetchChannelFulfilled(error)))
    );
