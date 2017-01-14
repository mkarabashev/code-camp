import React from 'react';
import ControlBox from '../../containers/Controls';
import Search from '../../containers/Search';

const Controls = () => (
  <header>
    <div className='flex'>
      <h1>TwitchTV</h1>
      <ControlBox />
    </div>
    <Search />
  </header>
);

export default Controls;
