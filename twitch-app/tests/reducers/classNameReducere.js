import { Map } from 'immutable';
import classNameReducer from 'reducers/classNameReducer';
import * as actions from 'actions';

describe('(Reducer) classNameReducer', () => {
  const initial = Map({ results: 'results' });

  it('should return initial state', () => {

  });

  it('should handle CHANGE_CLASSNAME', () => {
    const overwrite = { results: 'new results' };
    const add = { another: 'another' };
    const state1 = Map(overwrite);
    const state2 = initial.merge(add);
    expect(classNameReducer(initial, actions.changeClassname(overwrite))).to.deep.equal(state1);
    expect(classNameReducer(initial, actions.changeClassname(add))).to.deep.equal(state2);
  });
});
