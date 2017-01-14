import React, { PropTypes } from 'react';
import ChannelName from '../ChannelName';
import './ChannelBox.sass';

const ChannelBox = ({ data, handleChange }) => (
  <div className='flex'>
    <ChannelName
      logo={data.logo}
      displayName={data.displayName}
      lastUpdated={data.lastUpdated}
      url={data.url}
    />
    {data.status.length &&
      <i className='stream'>
        {data.status.length < 26 ? data.status : data.status.slice(0, 25) + '...'}
      </i>
    }
    <button className='btn' onClick={handleChange}>
      <i className='fa fa-times-circle' />
    </button>
  </div>
);

ChannelBox.propTypes = {
  data: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default ChannelBox;
