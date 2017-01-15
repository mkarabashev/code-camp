import React from 'react';
import { shallow } from 'enzyme';
import { Channels } from 'containers/Channels';
import ChannelBox from 'components/ChannelBox/ChannelBox';

const props = {
  channels: {},
  filteredChannels: [ 1, 2, 3 ],
  results: 'name',
  fetchDataIfNeeded: Function.prototype,
  deleteChannel: sinon.stub().returns(42)
};

describe('(Component) Channels', () => {
  let _wrapper;

  const wrap = props => shallow(<Channels {...props} />);

  beforeEach(() => {
    _wrapper = wrap(props);
  });

  it('should contain the results', () => {
    const noFilteredChannels = wrap(Object.assign({},
      props,
      { filteredChannels: [] }
    ));

    expect(_wrapper.hasClass(props.results)).to.be.true;
    expect(noFilteredChannels.find(ChannelBox)).not.to.exist;

    const $ChannelBox = _wrapper.find(ChannelBox);
    expect($ChannelBox).to.have.length(3);

    const ChannelBoxProps = $ChannelBox.first().props();
    expect(ChannelBoxProps.data).to.exist;
    expect(ChannelBoxProps.handleChange()).to.equal(props.deleteChannel());
  });
});
