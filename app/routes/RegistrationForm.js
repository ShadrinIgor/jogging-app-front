import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Panel} from 'react-bootstrap';
import {NotificationManager} from 'react-notifications';
import {createUser} from '../actions/UsersActions';
import RegistrationForm from '../components/RegistrationForm';

class RegistrationSuccess extends Component {
  render() {
    return <Panel header="Registration successfully completed" bsStyle="success">
      Now you can login
    </Panel>
  }
}

class Registration extends Component {
  constructor() {
    super();
    this.state = {isRegister: false};
  }

  componentWillUpdate(nextProps, nextState) {
    if (!this.props.users.status && nextProps.users.status === 'created') {
      this.setState({...this.state, isRegister: true});
      NotificationManager.success('Success', 'Registration');
    }
    if (!this.props.users.error && nextProps.users.error) {
      NotificationManager.error(nextProps.users.error, 'Registration');
    }
  }

  render() {
    return <div className="panel-default col-xs-6 center-form reg-form">
      {this.state.isRegister && <RegistrationSuccess />}
      {!this.state.isRegister && <RegistrationForm createUser={this.props.createUser.bind()}/>}
    </div>
  }
}

export default connect(
  state => ({
    users: state.users
  }),
  dispatch => ({
    createUser: (data) => {
      dispatch(createUser(data));
    }
  })
)(Registration);
