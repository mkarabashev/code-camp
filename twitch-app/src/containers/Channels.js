import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ALL, ONLINE, OFFLINE, MISSING } from '../constants';
import { fetchDataIfNeeded, deleteChannel } from '../actions';
import ChannelBox from '../components/ChannelBox';

export class Channels extends Component {

  componentDidMount () {
    const { channels, fetchDataIfNeeded } = this.props;
    for (let channel of channels.keySeq()) {
      fetchDataIfNeeded(channel);
    }
  }

  componentWillReceiveProps (nextProps) {
    const { channels } = nextProps;
    if (window.localStorage) window.localStorage.setItem('twitchViewerMK', channels);
  }

  render () {
    const { results, filteredChannels, deleteChannel } = this.props;

    return (
      <div className={results}>
        {filteredChannels.map((channel, i) =>
          <ChannelBox
            key={channel.displayName && channel.displayName.length
              ? channel.displayName
              : i
            }
            data={channel}
            handleChange={() => deleteChannel(channel.logName)}
          />
        )}
      </div>
    );
  }
};

Channels.propTypes = {
  filteredChannels: PropTypes.array.isRequired,
  channels: PropTypes.object.isRequired,
  results: PropTypes.string.isRequired,
  fetchDataIfNeeded: PropTypes.func.isRequired,
  deleteChannel: PropTypes.func.isRequired
};

const filterChannels = (channels, criteria) =>
  channels.filter(channel => criteria === ONLINE
    ? channel.status !== OFFLINE && channel.status !== MISSING
    : channel.status === criteria);

const orderChannels = (channels, filter, query) => {
  const orderByName = channels.sort((a, b) => a.displayName > b.displayName);

  const limitToQuery = orderByName.filter(
    channel => query !== ''
      ? channel.displayName.toLowerCase().search(query.toLowerCase()) !== -1
      : true);

  let online = [];
  let offline = [];
  let notThere = [];

  if (filter === ALL || filter === ONLINE) online = filterChannels(limitToQuery, ONLINE);
  if (filter === ALL || filter === OFFLINE) offline = filterChannels(limitToQuery, OFFLINE);
  if (filter === ALL || filter === MISSING) notThere = filterChannels(limitToQuery, MISSING);

  return [...online, ...offline, ...notThere];
};

const mapStateToProps = state => {
  return {
    filteredChannels: orderChannels(
      state.twitchReducer.toArray(),
      state.filterReducer,
      state.searchTermReducer.get(-1)
    ),
    channels: state.twitchReducer,
    results: state.classNameReducer.get('results')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchDataIfNeeded: channel => dispatch(fetchDataIfNeeded(channel)),
    deleteChannel: channel => dispatch(deleteChannel(channel))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channels);
