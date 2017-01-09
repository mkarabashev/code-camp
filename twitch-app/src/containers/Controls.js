import { connect } from 'react-redux';
import Controls from '../components/Controls';
import { invalidateData, fetchDataIfNeeded, setFilter } from '../actions';

const mapStateToProps = state => {
  return {
    channels: state.twitchReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRefreshClick: channels => {
      for (let channel of channels.keySeq()) {
        dispatch(invalidateData(channel));
        dispatch(fetchDataIfNeeded(channel));
      }
    },
    onFilterChange: (e, filter) => {
      e.preventDefault();
      dispatch(setFilter(filter.value));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls);
