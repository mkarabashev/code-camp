import React from 'react';
import ChannelName from '../ChannelName';

const ChannelBox = ({ data, handleChange }) => (
  <div className='flex'>
    <ChannelName
      logo={data.logo}
      displayName={data.displayName}
      lastUpdated={data.lastUpdated}
      url={data.url}
    />
    {data.status &&
      <i className='stream'>
        {data.status.length < 26 ? data.status : data.status.slice(0, 25) + '...'}
      </i>
    }
    <button className='btn' onClick={handleChange}>
      <i className="fa fa-times-circle"></i>
    </button>
  </div>
);

export default ChannelBox;
