import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form'
import { combineForms } from 'react-redux-form';

import records from './records';
import users from './users';
import auth from './auth';
import registrationForm from './registrationForm';

const initialUser = { registration: '' };

export default combineForms({
  records,
  users,
  auth,
  registrationForm
});