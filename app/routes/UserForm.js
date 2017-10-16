import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form} from 'react-redux-form';
import {Redirect} from 'react-router-dom';
import {NotificationManager} from 'react-notifications';
import {_SUCCESS} from '../constants/baseTypes';
import {getUser, save, clearData} from '../actions/UsersActions';
import UserForm from '../components/UserForm';
import 'react-day-picker/lib/style.css';

class UForm extends Component {
  constructor() {
    super();
    this.state = {saved: false};
  }

  componentWillMount() {
    if (this.props.match.params.id) {
      this.props.getUser(this.props.match.params.id);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (!this.props.userForm.status && nextProps.userForm.status === _SUCCESS) {
      this.setState({...this.state, saved: true});
      NotificationManager.success('User success save', 'Form');
    }
    if (!Object.keys(this.props.userForm.errors).length && Object.keys(nextProps.userForm.errors).length) {
      let errorMessage = 'Form filling error';
      if(nextProps.userForm.errors['role']){
        errorMessage = nextProps.userForm.errors['role'];
      }
      NotificationManager.error(errorMessage, 'Form');
      this.props.userForm.errors = [];
    }
  }

  render() {
    if(this.state.saved){
      this.props.clearData();
    }
    return <div className="panel-default col-xs-6 center-form">
      {this.state.saved && <Redirect to="/users"/>}
      {!this.state.saved && <UserForm userForm={this.props.userForm} userRole={this.props.userRole} save={this.props.saveItem.bind()}/>}
    </div>
  }
}

export default connect(
  state => ({
    users: state.users,
    userForm: state.userForm
  }),
  dispatch => ({
    saveItem: (data) => {
      dispatch(save(data));
    },
    getUser: (id) => {
      dispatch(getUser(id));
    },
    clearData: (id) => {
      dispatch(clearData(id));
    }
  })
)(UForm);
