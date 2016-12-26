import * as types from '../constants/ActionTypes.js';

export const addChannel = channel => ({ type: types.ADD_CHANNEL, channel });
export const removeChannel = channel => ({ type: types.REMOVE_CHANNEL, channel });
export const requestData = channel => ({ type: types.REQUEST_DATA, channel });
export const receiveData = (data, channel) => {
  console.log(data)
  return { type: types.RECEIVE_DATA, time: Date.now(), channel, data };
}
export const invalidateData = channel => ({ type: types.INVALIDATE_DATA, channel })

const shouldFetchData = (channel, state) => {
  const channelData = state.get(channel);
  if (!channelData.displayName) return true;
  if (channelData.isFetching) return false;
  return channelData.didInvalidate;
}

export const fetchDataIfNeeded = (channel, channels) => {
  if (shouldFetchData(channel, channels)) return dispatch(requestData(channel));
}
