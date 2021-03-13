import * as actions from '../actions/actionTypes';

export const tabs = (state = [], action) => {
  switch (action.type) {
    case actions.addTab:
      return state.includes(action.payload.tab)
        ? state
        : [...state, action.payload.tab];

    case actions.removeTab:
      return state.filter((tab) => tab !== action.payload.tab);

    default:
      return state;
  }
};
