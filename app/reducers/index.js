import {combineForms} from 'react-redux-form';
import records from './records';
import users from './users';
import userForm from './userForm';
import auth from './auth';
import registrationForm from './registrationForm';
import recordForm from './recordForm';
import reports from './reports';

export default combineForms({
  records,
  users,
  userForm,
  auth,
  registrationForm,
  recordForm,
  reports
});