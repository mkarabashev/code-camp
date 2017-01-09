import { LANG_CHANGE } from '../constants';
import { List } from 'immutable';

const langReducer = (state = List([ 'En' ]), action) => {
  switch (action.type) {
    case LANG_CHANGE:
      return state.push(action.lang);
    default:
      return state;
  }
};

export default langReducer;
