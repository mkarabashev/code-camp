import { connect } from 'react-redux';
import Search from '../components/Search';
import { getInt, setInt } from '../utils/misc';
import {
  addChannel,
  fetchDataIfNeeded,
  addQuery,
  changeClassName,
  fetchSuggestionsIfNeeded
} from '../actions';

const mapStateToProps = state => {
  return {
    autocomplete: state.autocompleteReducer,
    query: state.searchTermReducer.get(-1)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddClick: (e, input) => {
      e.preventDefault();
      const channel = input.value.trim().toLowerCase();

      if (channel) {
        dispatch(addChannel(channel));
        dispatch(fetchDataIfNeeded(channel));
      }

      dispatch(addQuery(''));
      dispatch(changeClassName({ results: 'results' }));
      input.value = '';
    },
    onBlur: () => dispatch(changeClassName({ results: 'results' })),
    onWritingText: input => {
      const onStopping = input => {
        if (!input) return dispatch(addQuery(''));
        const query = input.value.trim().toLowerCase();
        dispatch(addQuery(query));
        dispatch(fetchSuggestionsIfNeeded(query));
      };

      dispatch(changeClassName({
        results: 'results ' + (input.value !== '' ? 'extra-space' : '')
      }));

      clearInterval(getInt());
      setInt(window.setTimeout(
        () => onStopping(input),
        500
      ));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
