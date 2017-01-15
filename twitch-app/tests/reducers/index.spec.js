import reducers from 'reducers';
import autocompleteReducer from 'reducers/autocompleteReducer';
import classNameReducer from 'reducers/classNameReducer';
import filterReducer from 'reducers/filterReducer';
import searchTermReducer from 'reducers/searchTermReducer';
import twitchReducer from 'reducers/twitchReducer';

describe('(Reducers) Reducer Object', () => {
  it('should contain all the sync reducers', () => {
    const expectedObject = {
      autocompleteReducer,
      classNameReducer,
      filterReducer,
      searchTermReducer,
      twitchReducer
    };

    expect(reducers).to.deep.equal(expectedObject);
  });
});
