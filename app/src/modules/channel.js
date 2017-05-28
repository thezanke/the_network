import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs';
import { createAction, handleActions } from 'redux-actions';

// state
const defaultState = {
  loading: true,
  invalid: false,
  channelId: null,
  data: null
};

// actions
export const fetchChannel = createAction('FETCH_CHANNEL');
export const fetchChannelFulfilled = createAction('FETCH_CHANNEL_FULFILLED');

// reducer
export default handleActions(
  {
    [fetchChannel]: (state, { payload }) => {
      const channelId = Number(payload);
      return {
        ...defaultState,
        invalid: Number.isNaN(channelId),
        channelId
      };
    },
    [fetchChannelFulfilled]: {
      next: (state, { payload: { data } }) => ({
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
export const getChannelId = state => state.channel.channelId;
export const channelData = state => state.channel.data;
export const channelLoading = state => state.channel.loading;
export const channelInvalid = state => state.channel.invalid;

// epics
export const fetchChannelEpic = (action$, { getState }) =>
  action$
    .ofType(String(fetchChannel))
    .filter(() => !channelInvalid(getState()))
    .mergeMap(action =>
      ajax
        .getJSON(`/api/channels/${getChannelId(getState())}`)
        .map(response => fetchChannelFulfilled(response))
        .catch(error => Observable.of(fetchChannelFulfilled(error)))
    );
