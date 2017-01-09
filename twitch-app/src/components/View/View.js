import React from 'react';
import Controls from '../../containers/Controls';
import Channels from '../../containers/Channels';
import './View.sass';

const View = () => (
  <div className='container'>
    <Controls />
    <Channels />
  </div>
);

export default View;
