import React from 'react';
import { shallow } from 'enzyme';
import ChannelName from 'components/ChannelName/ChannelName';

describe('(Component) ChannelName', () => {
  let props = {
    logo: '',
    displayName: '',
    url: '',
    lastUpdated: NaN
  };

  it('should be placed to the left', () => {
    const _wrapper = shallow(<ChannelName {...props} />);
    expect(_wrapper.find('.left-side-entry')).to.exist;
    expect(_wrapper.find('div').hasClass('left-side-entry')).to.be.true;
  });

  it('should have a logo for the channel', () => {
    const _wrapper = shallow(<ChannelName {...props} />);
    const img = _wrapper.find('img');
    expect(img).to.exist;
    expect(img.hasClass('logo')).to.be.true;
  });

  it('should say "Loading..." while waiting for data', () => {
    const _wrapper = shallow(<ChannelName {...props} />);
    const strong = _wrapper.find('strong');
    expect(strong).to.exist;
    expect(strong.text()).to.match(/Loading.../);
  });

  it('should provide a link once data is retrieved', () => {
    const retrievedProps = Object.assign({}, props, { lastUpdated: new Date(2011, 1, 1).getTime() });
    const _wrapper = shallow(<ChannelName {...retrievedProps} />);
    expect(_wrapper.find('a')).to.exist;
  });
});
