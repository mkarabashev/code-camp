import React from 'react';
import 'babel-polyfill';
import { shallow } from 'enzyme';
import ChannelBox from 'components/ChannelBox/ChannelBox';
import ChannelName from 'components/ChannelName/ChannelName';

describe('(Component) ChannelBox', () => {
  let _wrapper;

  const props = {
    data: {
      logo: 'logo',
      displayName: 'name',
      lastUpdated: new Date(2011, 1, 1).getTime(),
      url: 'url',
      status: 'status'
    },
    handleChange: sinon.spy()
  };

  const wrap = props => shallow(<ChannelBox {...props} />);

  beforeEach(() => {
    _wrapper = wrap(props);
  });

  it('should have a channel name', () => {
    const ChannelNameProps = _wrapper.find(ChannelName).props();
    expect(ChannelNameProps.logo).to.equal(props.data.logo);
    expect(ChannelNameProps.displayName).to.equal(props.data.displayName);
    expect(ChannelNameProps.lastUpdated).to.equal(props.data.lastUpdated);
    expect(ChannelNameProps.url).to.equal(props.data.url);
  });

  it('should show the channel status if available and cut it if too long', () => {
    const changeStatus = status => wrap(Object.assign({},
      props,
      { data: Object.assign({}, props.data, { status }) }
    ));

    const noStatusWrapper = changeStatus('');
    const longStatusWrapper = changeStatus('a'.repeat(26));

    expect(noStatusWrapper.find('.stream')).not.to.exist;
    expect(longStatusWrapper.find('.stream').text()).to.match(/a{25}/);
    expect(_wrapper.find('.stream').text()).to.equal(props.data.status);
  });

  it('should have a delete button', () => {
    const button = _wrapper.find('button');
    expect(button.hasClass('btn')).to.be.true;
    expect(button.find('.fa').hasClass('fa-times-circle')).to.be.true;

    expect(_wrapper.props().handleChange).to.be.defined;
    button.simulate('click');
    expect(props.handleChange.calledOnce).to.be.true;
  });
});
