import React from 'react';
import { ALL, ONLINE, OFFLINE, MISSING } from '../../constants';
import './ControlBox.sass';

const ControlBox = ({ channels, onRefreshClick, onFilterChange }, filter) => (
  <div>
    <button className='btn' onClick={() => onRefreshClick(channels)}>
      <i className="fa fa-refresh" aria-hidden="true"></i>
    </button>
    <span> |</span>
    <span id='filter'>
      <select
        ref={node => filter = node}
        onChange={e => onFilterChange(e, filter)}
      >
        <option value={ALL}>All</option>
        <option value={ONLINE}>Online</option>
        <option value={OFFLINE}>Offline</option>
        <option value={MISSING}>Missing</option>
      </select>
      <i className="fa fa-filter" aria-hidden="true"></i>
    </span>
  </div>
);

export default ControlBox;
