import React from 'react';
import { shallow } from 'enzyme';
import View from 'components/View/View';
import Controls from 'components/Controls/Controls';
import Channels from 'containers/Channels';

describe('(Component) View', () => {
  let _wrapper;

  beforeEach(() => {
    _wrapper = shallow(<View />);
  });

  it('should be a container', () => {
    expect(_wrapper.hasClass('container')).to.be.true;
  });

  it('should have controls and channels', () => {
    expect(_wrapper.find(Controls)).to.exist;
    expect(_wrapper.find(Channels)).to.exist;
  });
});
