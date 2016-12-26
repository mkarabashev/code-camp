import 'whatwg-fetch';
import { receiveData } from '../actions';
import { REQUEST_DATA } from '../constants/ActionTypes';
import { makeUrl } from '../lib';

const twitchEpic = (action$, store) =>
  action$.ofType(REQUEST_DATA)
    .debounceTime(500)
    .switchMap(action => fetch(makeUrl(action.channel))
      .then(res => res.json())
      .then(data => receiveData(data, action.channel))
    );

export default twitchEpic;
