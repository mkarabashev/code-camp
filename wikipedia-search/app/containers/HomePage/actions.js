import {
  REQUEST_QUERY,
  RECEIVE_QUERY,
  INVALIDATE_QUERY,
  LANG_CHANGE,
  QUERY_SELECT,
  SUGGESTIONS_SELECT,
  CHANGE_CSSCLASS
} from './constants';

// sync actions
export const invalidateQuery = (lang, query) => ({ type: INVALIDATE_QUERY, lang, query });
export const requestQuery = (lang, query) => ({ type: REQUEST_QUERY, lang, query });
export const receiveQuery = (lang, query, data, time = Date.now()) => {
  return {
    type: RECEIVE_QUERY,
    lang,
    query,
    data,
    time
  };
};

export const langChange = lang => ({ type: LANG_CHANGE, lang });
export const querySelect = query => ({ type: QUERY_SELECT, query });
export const suggestionsSelect = query => ({ type: SUGGESTIONS_SELECT, query });
export const changeCssClass = (classDictionary) => ({ type: CHANGE_CSSCLASS, classDictionary});

// reset the search results after a certain time has passed
const shouldInvalidate = (state, lang, query) => {
  const entry = state.wikiReducer.get(query);
  if (!entry) return false;

  const langEntry = entry.get(lang);
  if (!langEntry) return false;

  return Date.now() - langEntry.get('updatedAt') > 0.5 * Math.pow(10, 6);
}

export const invalidateIfNeeded = (lang, query) => (dispatch, getState) => {
  if (shouldInvalidate(getState(), lang, query)) {
    return dispatch(invalidateQuery(lang, query));
  }
};

// async actions for accessing the wikipedia api
const fetchQuery = (lang, query, offset) => dispatch => {
  dispatch(requestQuery(lang, query));
  return Promise.race([
      fetch(createUrl(query, lang, offset)),
      timeoutPromise(3000)
    ])
    .then(res => res.ok ? res.json() : console.log('Response was not OK'))
    .then(payload => payload.query.search)
    .then(data => dispatch(receiveQuery(lang, query, data)))
    .catch(err => {
      dispatch(invalidateQuery(lang, query));
      console.log(err);
      return err;
    });
};

const shouldFetchQuery = (state, lang, query, offset) => {
  const entry = state.wikiReducer.get(query);
  if (!entry) return true;

  const langEntry = entry.get(lang);
  if (!langEntry) return true;

  if (langEntry.isFetching) return false;
  if (langEntry.get('data').size === offset) return true;
  return langEntry.get('didInvalidate');
};

export const fetchQueryIfNeeded = (lang, query, offset = 0) => (dispatch, getState) => {
  if (shouldFetchQuery(getState(), lang, query, offset)) {
    return dispatch(fetchQuery(lang, query, offset));
  }
};
