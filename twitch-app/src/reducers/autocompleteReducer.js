import { REQUIRE_SUGGESTIONS, RECEIVE_SUGGESTIONS, INVALIDATE_SUGGESTIONS } from '../constants';
import { Map } from 'immutable';

const suggestionReducer = (
  state = {
    isFetching: false,
    didInvalidate: false,
    suggestions: []
  },
  action
) => {
  switch (action.type) {
    case REQUIRE_SUGGESTIONS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_SUGGESTIONS:
      return Object.assign({}, state, {
        isFetching: false,
        suggestions: action.suggestions
      });
    case INVALIDATE_SUGGESTIONS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: true
      });
    default:
      return state;
  }
};

const autocompleteReducer = (state = Map(), action) => {
  switch (action.type) {
    case REQUIRE_SUGGESTIONS:
    case RECEIVE_SUGGESTIONS:
    case INVALIDATE_SUGGESTIONS:
      return state.set(
        action.query,
        suggestionReducer(state.get(action.query), action)
      );
    default:
      return state;
  }
};

export default autocompleteReducer;
