import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from 'actions';
import * as types from 'constants';
import fetchMock from 'fetch-mock';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('(Sync Actions)', () => {
  it('should add a channel', () => {
    const channel = 'channel';
    const expectedAction = { type: types.ADD_CHANNEL, channel };
    expect(actions.addChannel(channel)).to.deep.equal(expectedAction);
  });

  it('should delete a channel', () => {
    const channel = 'channel';
    const expectedAction = { type: types.DELETE_CHANNEL, channel };
    expect(actions.deleteChannel(channel)).to.deep.equal(expectedAction);
  });

  it('should set a filter', () => {
    const filter = 'filter';
    const expectedAction = { type: types.SET_FILTER, filter };
    expect(actions.setFilter(filter)).to.deep.equal(expectedAction);
  });

  it('should add a search query for a channel', () => {
    const query = 'query';
    const expectedAction = { type: types.ADD_QUERY, query };
    expect(actions.addQuery(query)).to.deep.equal(expectedAction);
  });

  it('should change some css class names', () => {
    const nameObj = {};
    const expectedAction = { type: types.CHANGE_CLASSNAME, nameObj };
    expect(actions.changeClassName(nameObj)).to.deep.equal(expectedAction);
  });
});

describe('(Async Actions)', () => {
  afterEach(() => {
    fetchMock.restore();
    fetchMock.reset();
  });

  it('should create RECEIVE_SUGGESTIONS when fetching suggestions has been done', () => {
    const query = 'query';
    const suggestions = [{ display_name: 'name' }];

    fetchMock.get('*', { channels: suggestions });

    const expectedAction = [
      { type: types.REQUIRE_SUGGESTIONS, query },
      { type: types.RECEIVE_SUGGESTIONS, query, suggestions: [ 'name' ] }
    ];

    const store = mockStore({});

    return store.dispatch(actions.fetchSuggestions(query))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedAction);
      });
  });

  it('should create RECEIVE_DATA when fetching data has been done', () => {
    const channel = 'channel';
    const payload = 'payload';

    fetchMock.get('*', { payload });

    const expectedAction = [
      { type: types.REQUIRE_DATA, channel },
      { type: types.RECEIVE_DATA, channel, data: { payload } }
    ];

    const store = mockStore({});

    return store.dispatch(actions.fetchData(channel))
      .then(() => {
        const action = store.getActions();
        expect(action[0]).to.deep.equal(expectedAction[0]);
        expect(action[1].type).to.equal(expectedAction[1].type);
        expect(action[1].channel).to.equal(expectedAction[1].channel);
        expect(action[1].data).to.deep.equal(expectedAction[1].data);
      });
  });
});
