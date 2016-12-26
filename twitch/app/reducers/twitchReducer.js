import { REQUEST_DATA, RECEIVE_DATA, INVALIDATE_DATA } from '../constants/ActionTypes';

const twitchReducer = (
  state = {
    isFetching: false,
    didInvalidate: false,
    displayName: '',
    logo: '',
    status: '',
    lastUpdated: ''
  },
  action
) => {
  switch (action.type) {
    case REQUEST_DATA:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: action.time,
        displayName: action.data.display_name,
        logo: action.data.logo,
        status: action.data.status
      });
    case INVALIDATE_DATA:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    default:
      return state;
  }
};

export default twitchReducer;
