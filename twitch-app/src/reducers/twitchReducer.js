import {
  ADD_CHANNEL,
  REQUIRE_DATA,
  RECEIVE_DATA,
  INVALIDATE_DATA,
  DELETE_CHANNEL,
  OFFLINE,
  MISSING
} from '../constants';
import { Map } from 'immutable';

export const channelReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CHANNEL:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: NaN,
        displayName: '',
        logo: '',
        status: '',
        url: ''
      });
    case REQUIRE_DATA:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: action.receivedAt,
        logName: action.channel,
        displayName: action.data.display_name || action.channel,
        logo: action.data.logo || '',
        status: action.data.stream
          ? action.data.status
          : (action.data.display_name ? OFFLINE : MISSING),
        url: action.data.url || ''
      });
    case INVALIDATE_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: true
      });
    default:
      return state;
  }
};

const twitchReducer = (state = Map(), action) => {
  switch (action.type) {
    case ADD_CHANNEL:
    case REQUIRE_DATA:
    case RECEIVE_DATA:
    case INVALIDATE_DATA:
      return state.set(
        action.channel,
        channelReducer(state.get(action.channel), action)
      );
    case DELETE_CHANNEL:
      return state.delete(action.channel);
    default:
      return state;
  }
};

export default twitchReducer;
