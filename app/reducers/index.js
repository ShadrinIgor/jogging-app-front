import {combineReducers} from 'redux';

import items from './items';
import users from './users';

export default combineReducers({
  items,
  users
});