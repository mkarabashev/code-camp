import { CHANGE_CLASSNAME } from '../constants';
import { Map } from 'immutable';

const classNameReducer = (state = Map({ results: 'results' }), action) => {
  switch (action.type) {
    case CHANGE_CLASSNAME:
      return state.merge(action.nameObj);
    default:
      return state;
  };
};

export default classNameReducer;
