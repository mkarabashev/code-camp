import { Map } from 'immutable';
import { REMOVE_CHANNEL, REQUEST_DATA, RECEIVE_DATA, INVALIDATE_DATA} from '../constants/ActionTypes.js';
import twitchReducer from './twitchReducer';
import defaultChannels from '../constants/defaultChannels';

let channelObj = {};
defaultChannels.forEach(channel => channelObj[channel] = {
  isFetching: false,
  displayName: '',
  logo: '',
  status: '',
  lastUpdated: ''
});

const channelsReducer = (state = Map(channelObj), action) => {
  switch (action.type) {
    case REMOVE_CHANNEL:
      return state.delete(action.channel);
    case REQUEST_DATA:
    case RECEIVE_DATA:
    case INVALIDATE_DATA:
      console.log(action)
      return state.set(
        action.channel,
        twitchReducer(state.get(action.channel), action)
      );
    default:
      return state;
  };
};

export default channelsReducer;
