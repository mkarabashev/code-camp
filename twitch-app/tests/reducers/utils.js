import { Map } from 'immutable';

export const generateMocks = (parentReducer, childReducer) =>
  (action, payload, ...rest) => {
    const action1 = action.apply(null, ['query1'].concat(rest));
    const action2 = action.apply(null, ['query2'].concat(rest));

    const mock1 = Map().set(action1[payload], childReducer(undefined, action1));
    const mock2 = mock1.set(action2[payload], childReducer(undefined, action2));

    expect(parentReducer(Map(), action1))
      .to.deep.equal(mock1);

    expect(parentReducer(mock1, action2))
      .to.deep.equal(mock2);
  };

export const generateChildTest = (childReducer, initial) =>
  (action, change, payload = []) => {
    const state = Object.assign({}, initial, change);
    const _action = action.apply(null, ['placeholder'].concat(payload));
    expect(childReducer(initial, _action)).to.deep.equal(state);
  };
