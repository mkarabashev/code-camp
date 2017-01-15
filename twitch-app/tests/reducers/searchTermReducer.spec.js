import { List } from 'immutable';
import searchTermReducer from 'reducers/searchTermReducer';
import * as actions from 'actions';

describe('(Reducer) searchTermReducer', () => {
  const initial = List(['']);

  it('should return initial state', () => {
    expect(searchTermReducer(undefined, {})).to.deep.equal(initial);
  });

  it('should handle ADD_QUERY', () => {
    const query1 = 'query1';
    const query2 = 'query2';
    const mock1 = initial.push(query1);
    const mock2 = mock1.push(query2);
    expect(searchTermReducer(initial, actions.addQuery(query1))).to.deep.equal(mock1);
    expect(searchTermReducer(mock1, actions.addQuery(query2))).to.deep.equal(mock2);
  });
});
