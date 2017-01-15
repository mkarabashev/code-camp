import React from 'react';
import { shallow } from 'enzyme';
import Controls from 'components/Controls/Controls';
import ControlBox from 'containers/Controls';
import Search from 'containers/Search';

describe('(Component) Controls', () => {
  let _wrapper;

  beforeEach(() => {
    _wrapper = shallow(<Controls />);
  });

  it('should be a flex header', () => {
    expect(_wrapper.type()).to.be.equal('header');
    expect(_wrapper.find('.flex')).to.exist;
  });

  it('should have a title', () => {
    expect(_wrapper.find('h1').text()).to.match(/TwitchTV/);
  });

  it('should have a control box and a search bar', () => {
    expect(_wrapper.find(ControlBox)).to.exist;
    expect(_wrapper.find(Search)).to.exist;
  });
});
