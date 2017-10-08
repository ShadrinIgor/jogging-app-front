import {combineForms} from 'react-redux-form';
import records from './records';
import users from './users';
import auth from './auth';
import registrationForm from './registrationForm';
import recordForm from './recordForm';
import reports from './reports';

export default combineForms({
  records,
  users,
  auth,
  registrationForm,
  recordForm,
  reports
});