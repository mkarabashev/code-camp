import React, { PropTypes } from 'react';
import { defLogo } from '../../utils/urls';
import './ChannelName.sass';

const ChannelName = ({ logo, displayName, lastUpdated, url }) => (
  <div className='left-side-entry'>
    <img
      className='logo'
      src={logo.length ? logo : defLogo}
      alt={displayName + ' logo'}
      height='35px'
      />
    <strong>
      {lastUpdated
        ? <a target='_blank' href={url}>
          {displayName.length < 23
            ? displayName
            : displayName.slice(0, 20) + '...'
          }
        </a>
        : 'Loading...'
      }
    </strong>
  </div>
);

ChannelName.propTypes = {
  logo: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  lastUpdated: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired
};

export default ChannelName;
