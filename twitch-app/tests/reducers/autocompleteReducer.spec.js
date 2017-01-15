import { Map } from 'immutable';
import autocompleteReducer, { suggestionReducer } from 'reducers/autocompleteReducer';
import * as actions from 'actions';
import { generateMocks, generateChildTest } from './utils';

describe('(Reducer) autocompleteReducer', () => {
  const testMocks = generateMocks(autocompleteReducer, suggestionReducer);

  it('should return initial state', () => {
    expect(autocompleteReducer(undefined, {})).to.deep.equal(Map());
  });

  it('should handle REQUIRE_SUGGESTIONS', () => {
    testMocks(actions.requireSuggestions, 'query');
  });

  it('should handle RECEIVE_SUGGESTIONS', () => {
    testMocks(actions.receiveSuggestions, 'query', []);
  });

  it('should handle INVALIDATE_SUGGESTIONS', () => {
    testMocks(actions.invalidateSuggestions, 'query');
  });
});

describe('(Reducer) suggestionReducer', () => {
  const initial = {
    isFetching: false,
    didInvalidate: false,
    suggestions: []
  };

  const testChildReducer = generateChildTest(suggestionReducer, initial);

  it('should return initial state', () => {
    expect(suggestionReducer(undefined, {})).to.deep.equal(initial);
  });

  it('should handle REQUIRE_SUGGESTIONS', () => {
    const change = { isFetching: true };
    testChildReducer(actions.requireSuggestions, change);
  });

  it('should handle RECEIVE_SUGGESTIONS', () => {
    const change = { isFetching: false, suggestions: [ 1, 2, 3 ] };
    const payload = [ [ 1, 2, 3 ] ];
    testChildReducer(actions.receiveSuggestions, change, payload);
  });

  it('should handle INVALIDATE_SUGGESTIONS', () => {
    const change = { isFetching: false, didInvalidate: true };
    testChildReducer(actions.invalidateSuggestions, change);
  });
});
