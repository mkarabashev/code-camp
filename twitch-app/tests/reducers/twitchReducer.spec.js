import { Map } from 'immutable';
import twitchReducer, { channelReducer } from 'reducers/twitchReducer';
import * as actions from 'actions';
import * as types from 'constants';
import { generateMocks, generateChildTest } from './utils';

describe('(Reducer) twitchReducer', () => {
  const testMocks = generateMocks(twitchReducer, channelReducer);

  it('should return initial state', () => {
    expect(twitchReducer(undefined, {})).to.deep.equal(Map());
  });

  it('should handle ADD_CHANNEL', () => {
    testMocks(actions.addChannel, 'channel');
  });

  it('should handle REQUIRE_DATA', () => {
    testMocks(actions.requireData, 'channel');
  });

  it('should handle RECEIVE_DATA', () => {
    testMocks(actions.receiveData, 'channel', { data: {}, game: '' });
  });

  it('should handle INVALIDATE_DATA', () => {
    testMocks(actions.invalidateData, 'channel');
  });

  it('should handle DELETE_CHANNEL', () => {
    const state = Map().set('channel', {});
    expect(twitchReducer(state, actions.deleteChannel('channel'))).to.deep.equal(Map());
  });
});

describe('(Reducer) channelReducer', () => {
  const initial = {};
  const testChildReducer = generateChildTest(channelReducer, initial);

  // data for testing the receive action
  const defaultData = {
    display_name: 'display_name',
    logo: 'logo',
    stream: 'stream',
    status: 'status',
    url: 'url'
  };

  const defaultPayload = [ defaultData, 42 ];

  const defaultChange = {
    isFetching: false,
    didInvalidate: false,
    lastUpdated: 42,
    logName: 'placeholder',
    displayName: 'display_name',
    logo: 'logo',
    status: 'status',
    url: 'url'
  };

  it('should return initial state', () => {
    expect(channelReducer(undefined, {})).to.deep.equal(initial);
  });

  it('should handle ADD_CHANNEL', () => {
    const change = {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: NaN,
      displayName: '',
      logo: '',
      status: '',
      url: ''
    };

    testChildReducer(actions.addChannel, change);
  });

  it('should handle REQUIRE_DATA', () => {
    const change = {
      isFetching: true,
      didInvalidate: false
    };

    testChildReducer(actions.requireData, change);
  });

  it('should handle INVALIDATE_DATA', () => {
    const change = {
      isFetching: false,
      didInvalidate: true
    };

    testChildReducer(actions.invalidateData, change);
  });

  it('should handle RECEIVE_DATA when the channel is missing from twitch', () => {
    const change = Object.assign({}, defaultChange, {
      displayName: 'placeholder',
      logo: '',
      status: types.MISSING,
      url: ''
    });

    let payload = defaultPayload.slice();
    payload[0] = {};

    testChildReducer(actions.receiveData, change, payload);
  });

  it('should handle RECEIVE_DATA when the channel doesn\'t have a logo', () => {
    const change = Object.assign({}, defaultChange, { logo: '' });
    const data = Object.assign({}, defaultData, { logo: null });
    let payload = defaultPayload.slice();
    payload[0] = data;

    testChildReducer(actions.receiveData, change, payload);
  });

  it('should handle RECEIVE_DATA when the channel is offline', () => {
    const change = Object.assign({}, defaultChange, { status: types.OFFLINE });
    const data = Object.assign({}, defaultData, { stream: null });
    let payload = defaultPayload.slice();
    payload[0] = data;

    testChildReducer(actions.receiveData, change, payload);
  });

  it('should handle RECEIVE_DATA when the channel is streaming', () => {
    testChildReducer(actions.receiveData, defaultChange, defaultPayload);
  });
});
