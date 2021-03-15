import * as actions from './actionTypes';

export const addTab = (tab) => {
  return {
    type: actions.addTab,
    payload: {
      tab,
    },
  };
};

export const removeTab = (tab) => {
  return {
    type: actions.removeTab,
    payload: {
      tab,
    },
  };
};

export const addUsers = (users) => {
  return {
    type: actions.addUsers,
    payload: {
      users,
    },
  };
};

export const addUserGroups = (userGroups) => {
  return {
    type: actions.addUserGroups,
    payload: {
      userGroups,
    },
  };
};

export const refreshTable = (refresh) => {
  return {
    type: actions.refreshTable,
    payload: {
      refresh,
    },
  };
};
