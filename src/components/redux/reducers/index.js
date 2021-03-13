import { combineReducers } from 'redux';
// reducers
import { tabs } from './tabs';
import { APIData } from './APIData';

const reducers = combineReducers({
  tabs,
  APIData,
});

export default reducers;
