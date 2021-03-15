import { combineReducers } from 'redux';
// reducers
import { tabs } from './tabs';
import { APIData } from './APIData';
import { refresh } from './refresh';

const reducers = combineReducers({
  tabs,
  APIData,
  refresh,
});

export default reducers;
