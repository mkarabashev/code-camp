import { QUERY_SELECT } from '../constants';
import { List } from 'immutable';

const queryReducer = (state = List(), action) => {
  switch (action.type) {
    case QUERY_SELECT:
      return state.push(action.query);
    default:
      return state;
  }
};

export default queryReducer;
