import * as actions from '../actions/actionTypes';

export const refresh = (state = false, action) => {
  switch (action.type) {
    case actions.refreshTable:
      return action.payload.refresh;

    default:
      return state;
  }
};
