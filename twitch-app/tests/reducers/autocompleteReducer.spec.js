import { Map } from 'immutable';
import autocompleteReducer, { suggestionReducer } from 'reducers/autocompleteReducer';
import * as actions from 'actions';

describe('(Reducer) autocompleteReducer', () => {
  const generateMocksAndTest = action => {
    const action1 = action('query1')
    const action2 = action('query2')
    const mock1 = Map().set(action1.query, suggestionReducer(undefined, action1));
    const mock2 = mock1.set(action2.query, suggestionReducer(undefined, action2));

    expect(autocompleteReducer(Map(), action1))
      .to.deep.equal(mock1);

    expect(autocompleteReducer(mock1, action2))
      .to.deep.equal(mock2);
  }

  it('should return initial state', () => {
    expect(autocompleteReducer(undefined, {})).to.deep.equal(Map());
  });

  it('should handle REQUIRE_SUGGESTIONS', () => {
    generateMocksAndTest(actions.requireSuggestions);
  });

  it('should handle RECEIVE_SUGGESTIONS', () => {
    generateMocksAndTest(actions.receiveSuggestions);
  });

  it('should handle INVALIDATE_SUGGESTIONS', () => {
    generateMocksAndTest(actions.invalidateSuggestions);
  });
});

describe('(Reducer) suggestionReducer', () => {
  it('should return initial state', () => {

  });

  it('should handle REQUIRE_SUGGESTIONS', () => {

  });

  it('should handle RECEIVE_SUGGESTIONS', () => {

  });

  it('should handle INVALIDATE_SUGGESTIONS', () => {

  });
});
