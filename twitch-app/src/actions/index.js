import {
  REQUIRE_DATA,
  RECEIVE_DATA,
  INVALIDATE_DATA,
  ADD_CHANNEL,
  DELETE_CHANNEL,
  SET_FILTER,
  REQUIRE_SUGGESTIONS,
  RECEIVE_SUGGESTIONS,
  ADD_QUERY,
  CHANGE_CLASSNAME
} from '../constants';

import { makeUrl, config } from '../utils/urls';
import { timeoutPromise } from '../utils/misc';

// sync action creators
export const requireData = channel => ({ type: REQUIRE_DATA, channel });
export const receiveData = (channel, data, receivedAt = Date.now()) => ({
  type: RECEIVE_DATA,
  receivedAt,
  channel,
  data
});
export const invalidateData = channel => ({ type: INVALIDATE_DATA, channel });
export const addChannel = channel => ({ type: ADD_CHANNEL, channel });
export const deleteChannel = channel => ({ type: DELETE_CHANNEL, channel });
export const setFilter = filter => ({ type: SET_FILTER, filter });
export const requireSuggestions = query => ({ type: REQUIRE_SUGGESTIONS, query });
export const receiveSuggestions = (query, suggestions) => ({ type: RECEIVE_SUGGESTIONS, query, suggestions });
export const invalidateSuggestions = query => ({ type: INVALIDATE_SUGGESTIONS, query });
export const addQuery = query => ({ type: ADD_QUERY, query });
export const changeClassName = nameObj => ({ type: CHANGE_CLASSNAME, nameObj});

// async action creators
const fetchReq = (type, channel) => Promise.race([
    fetch(makeUrl(type, channel), config),
    timeoutPromise(3000)
  ])
  .then(res => res.json());

const fetchData = channel => dispatch => {
  dispatch(requireData(channel));

  return Promise
    .all([
      fetchReq('channels', channel),
      fetchReq('streams', channel)
    ])
    .then(payload => Object.assign({}, payload[0], payload[1]))
    .then(data => dispatch(receiveData(channel, data)))
    .catch(err => {
      dispatch(invalidateData);
      console.log(err);
      return err;
    });
};

const shouldFetchData = (state, channel) => {
  const channelData = state.twitchReducer.get(channel);
  if (!channelData.lastUpdated) return true;
  if (channelData.isFetching) return false;
  return channelData.didInvalidate;
};

export const fetchDataIfNeeded = channel => (dispatch, getState) => {
  if (shouldFetchData(getState(), channel)) return dispatch(fetchData(channel));
};

const fetchSuggestions = query => dispatch => {
  dispatch(requireSuggestions(query))
  return Promise.race([
      fetch(makeUrl('search/channels?limit=5&q=', query), config),
      timeoutPromise(3000)
    ])
    .then(res => res.json())
    .then(payload => payload.channels.map(suggestion => suggestion.display_name))
    .then(data => dispatch(receiveSuggestions(query, data)))
    .catch(err => {
      dispatch(invalidateSuggestions);
      console.log(err);
      return err;
    });
};

const shouldFetchSuggestions = (state, query) => {
  const _query = state.autocompleteReducer.get(query);
  return !_query || _query.didInvalidate;
};

export const fetchSuggestionsIfNeeded = query => (dispatch, getState) => {
  if (shouldFetchSuggestions(getState(), query)) return dispatch(fetchSuggestions(query));
};
