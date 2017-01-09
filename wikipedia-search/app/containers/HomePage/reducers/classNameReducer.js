import { CHANGE_CSSCLASS } from '../constants';
import { Map } from 'immutable';

const classNameReducer = (
  state = Map({
    'searchBar': 'group center-vertical',
    'langBar': 'select',
    'caret': 'fa fa-caret-down',
    'menu': 'menu hidden',
    'selected': 'selected'
  }),
  action
) => {
  switch (action.type) {
    case CHANGE_CSSCLASS:
      return state.merge(action.classDictionary)
    default:
      return state;
  }
};

export default classNameReducer;
