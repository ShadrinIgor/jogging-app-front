import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form'
import { combineForms } from 'react-redux-form';

import items from './items';
import users from './users';
import auth from './auth';
import registrationForm from './registrationForm';

const initialUser = { registration: '' };

export default combineForms({
  items,
  users,
  auth,
  registrationForm
});