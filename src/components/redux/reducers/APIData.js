import * as actions from '../actions/actionTypes';

export const APIData = (state = {}, action) => {
  switch (action.type) {
    case actions.addUsers:
      return { ...state, users: action.payload.users };

    case actions.addUserGroups:
      return { ...state, userGroups: action.payload.userGroups };

    default:
      return state;
  }
};
