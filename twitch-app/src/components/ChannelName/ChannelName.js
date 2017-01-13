import React from 'react';
import { defLogo } from '../../utils/urls';
import './ChannelName.sass';

const ChannelName = ({ logo, displayName, lastUpdated, url }) => (
  <div className='left-side-entry'>
    <img
      className='logo'
      src={logo || defLogo}
      alt={displayName + ' logo'}
      height='35px'
      />
    <strong>
      {lastUpdated
        ? <a target='_blank' href={url}>
          {displayName.length < 23
            ? displayName
          : displayName.slice(0, 20) + '...'}
        </a>
        : 'Loading...'
      }
    </strong>
  </div>
);

export default ChannelName;
