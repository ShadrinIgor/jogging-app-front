import {combineReducers} from 'redux';

import items from './items';
import users from './users';
import auth from './auth';

export default combineReducers({
  items,
  users,
  auth
});