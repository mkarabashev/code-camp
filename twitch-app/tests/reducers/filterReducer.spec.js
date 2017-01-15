import filterReducer from 'reducers/filterReducer';
import * as actions from 'actions';
import * as types from 'constants';

describe('(Reducer) filterReducer', () => {
  const initial = types.ALL;

  it('should return initial state', () => {
    expect(filterReducer(undefined, {})).to.deep.equal(initial);
  });

  it('should handle SET_FILTER', () => {
    expect(filterReducer(initial, actions.setFilter(types.ONLINE))).to.equal(types.ONLINE);
    expect(filterReducer(initial, actions.setFilter(types.OFFLINE))).to.equal(types.OFFLINE);
    expect(filterReducer(initial, actions.setFilter(types.MISSING))).to.equal(types.MISSING);
  });
});
