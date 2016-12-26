import React from 'react';
import { connect } from 'react-redux';
import { requestData } from '../actions';

class App extends React.Component {
  componentDidMount() {
    const { fetchDataIfNeeded, channels } = this.props;
    for (let channel of channels.keySeq()) {
      fetchDataIfNeeded(channel, channels);
    }
  }

  render() {
    const { channels } = this.props;
    for (let channel of channels.keySeq()) {
      console.log(channels.get(channel));
    }    return (
      <div>test</div>
    )
  }
}

const mapStateToProps = state => {
  return {
    channels: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchDataIfNeeded: (channel, channels) => {
      const shouldFetchData = (channel, state) => {
        const channelData = state.get(channel);
        if (!channelData.displayName) return true;
        if (channelData.isFetching) return false;
        return channelData.didInvalidate;
      }

      if (shouldFetchData(channel, channels)) return dispatch(requestData(channel));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
