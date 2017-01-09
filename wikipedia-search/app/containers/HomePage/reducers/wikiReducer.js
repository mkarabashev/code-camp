import { REQUEST_QUERY, RECEIVE_QUERY, INVALIDATE_QUERY } from '../constants';
import { Map } from 'immutable';

const searchReducer = (
  state = Map({
    isFetching: false,
    didInvalidate: false,
    data: List(),
    updatedAt: null
  }),
  action
) => {
  switch (action.type) {
    case REQUEST_QUERY:
      return state.merge({
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_QUERY:
      return state.merge({
        isFetching: false,
        didInvalidate: false,
        data: state.get('data').concat(action.data),
        updatedAt: action.time
      });
    case INVALIDATE_QUERY:
      return state.merge({
        isFetching: false,
        didInvalidate: true,
        data: []
      });
    default:
      return state;
  }
};

const langSearchReducer = (state = Map(), action) => {
  switch (action.type) {
    case REQUEST_QUERY:
    case RECEIVE_QUERY:
    case INVALIDATE_QUERY:
      return state.set(
        action.lang,
        searchReducer(state.get(action.lang), action)
      );
    default:
      return state;
  }
};

const wikiReducer = (state = Map(), action) => {
  switch (action.type) {
    case REQUEST_QUERY:
    case RECEIVE_QUERY:
    case INVALIDATE_QUERY:
      return state.set(
        action.query,
        langSearchReducer(state.get(action.query), action)
      );
    default:
      return state;
  }
};

export default wikiReducer;
