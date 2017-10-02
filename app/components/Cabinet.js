import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Panel} from 'react-bootstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {createUser} from '../actions/UsersActions';

class Cabinet extends Component {
  render() {
    return <Panel header="Registration successfully completed" bsStyle="success">
      This is cabinet
    </Panel>
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
)(Cabinet);
