import React from 'react';
import { shallow } from 'enzyme';
import ControlBox from 'components/ControlBox/ControlBox';

describe('(Component) ControlBox', () => {
  let _wrapper;

  const props = {
    channels: {},
    onRefreshClick: sinon.spy(),
    onFilterChange: Function.prototype
  };

  beforeEach(() => {
    _wrapper = shallow(<ControlBox {...props} />);
  });

  it('should have a refresh button', () => {
    const button = _wrapper.find('button');
    expect(button).to.exist;
    expect(button.find('.fa').hasClass('fa-refresh')).to.be.true;

    expect(_wrapper.props().onRefreshClick).to.be.defined;
    button.simulate('click');
    expect(props.onRefreshClick.calledOnce).to.be.true;
  });

  it('should have a filter for the status', () => {
    const filter = _wrapper.find('#filter');
    expect(filter).to.exist;
    expect(filter.find('.fa').hasClass('fa-filter')).to.be.true;
    expect(filter.find('option')).to.have.length(4);
    expect(_wrapper.props().onFilterChange).to.be.defined;
  });
});
