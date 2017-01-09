import { SUGGESTIONS_SELECT } from '../constants';
import { List } from 'immutable';

const autocompleteReducer = (state = List(), action) => {
  switch (action.type) {
    case SUGGESTIONS_SELECT:
      return state.push(action.query);
    default:
      return state;
  }
};

export default autocompleteReducer;
