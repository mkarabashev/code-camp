import { ADD_QUERY } from '../constants';
import { List } from 'immutable';

const searchTermReducer = (state = List(['']), action) => {
  switch (action.type) {
    case ADD_QUERY:
      return state.push(action.query);
    default:
      return state;
  }
};

export default searchTermReducer;
