import {combineForms} from 'react-redux-form';
import records from './records';
import allRecords from './allRecords';
import allRecordForm from './allRecordForm';
import users from './users';
import userForm from './userForm';
import auth from './auth';
import registrationForm from './registrationForm';
import recordForm from './recordForm';
import reports from './reports';

export default combineForms({
  users,
  userForm,
  registrationForm,
  auth,
  records,
  recordForm,
  reports,
  allRecords,
  allRecordForm
});