import React from 'react';
import { Map } from 'immutable';
import { shallow } from 'enzyme';
import Search from 'components/Search/Search';

describe('(Component) Search', () => {
  let _wrapper;

  const props = {
    autocomplete: Map().set(
      'test',
      { suggestions: [ 1, 2, 3 ] }
    ),
    query: 'test',
    onAddClick: sinon.spy(),
    onBlur: Function.prototype,
    onWritingText: Function.prototype
  };

  beforeEach(() => {
    _wrapper = shallow(<Search {...props} />);
  });

  it('should be a form', () => {
    expect(_wrapper.type()).to.equal('form');
  });

  it('should have a meterial design input', () => {
    expect(_wrapper.find('input')).to.exist;
    expect(_wrapper.find('.bar')).to.exist;

    const label = _wrapper.find('label');
    expect(label).to.exist;
    expect(label.text()).to.match(/Search for channels/);
  });

  it('should have a search button', () => {
    const button = _wrapper.find('button');
    expect(button).to.exist;
    expect(button.hasClass('btn')).to.be.true;
    expect(button.find('.fa').hasClass('fa-search')).to.be.true;

    expect(_wrapper.props().onAddClick).to.be.defined;
    button.simulate('click');
    expect(props.onAddClick.calledOnce).to.be.true;
  });

  it('should provide suggestions', () => {
    expect(_wrapper.find('option')).to.have.length(3);
  });
});
