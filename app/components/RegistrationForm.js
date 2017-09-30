import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Control, Errors, Form} from 'react-redux-form';
import {Panel} from 'react-bootstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {createUser} from '../actions/UsersActions';
import {isEmail} from '../utils/ValidationUtil';

class RegistrationForm extends Component {
  handleSubmit(val) {
    this.props.createUser(val);
  }

  render() {
    const longEnough = (val) => val && val.length > 7;
    const allFieldRequired = (vals) => vals.name && vals.surname && vals.email && vals.password && vals.confirmPassword;
    return <Form model="registrationForm" onSubmit={(val) => this.handleSubmit.call(this, val)}
                 validators={{
                   '': {
                     allFieldRequired,
                     passwordsMatch: (vals) => !vals.password || !vals.confirmPassword || vals.password === vals.confirmPassword,
                     incorrectEmail: (vals) => !vals.email || isEmail(vals.email),
                     passwordLength: (vals) => !vals.password || longEnough(vals.password)
                   }
                 }}>

      <NotificationContainer/>
      <div className="row">
        <Errors
          model="registrationForm"
          show={{touched: true, focus: false}}
          wrapper={(props) => <div className="errors">{props.children}</div>}
          messages={{
            passwordsMatch: 'Password and confirm not match',
            allFieldRequired: 'All fields required',
            incorrectEmail: 'Incorrect email',
            passwordLength: 'Password mast be more 7 literal'
          }}
        />

        <div className="form-group col-xs-6">
          <Control.text model=".name" className="form-control" id="inputEmail" placeholder="First name"/>
        </div>
        <div className="form-group col-xs-6">
          <Control.text model=".surname" className="form-control" id="surname" placeholder="Surname"/>
        </div>
      </div>
      <div className="form-group">
        <Control.text type="text" model=".email" className="form-control" id="email" placeholder="Email"/>
      </div>
      <div className="form-group">
        <Control.text type="password" model=".password" className="form-control" id="password" placeholder="Password"
        />
      </div>
      <div className="form-group">
        <Control.text type="password" model=".confirmPassword" className="form-control" id="confirmPassword"
                      placeholder="Repeat password"/>
      </div>
      <button type="submit" className="btn btn-success pull-right">Create an account</button>

    </Form>
  }
}

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
    console.log(this.props, nextProps);
    if (!this.props.users.status && nextProps.users.status === 'created') {
      this.setState({...this.state, isRegister: true});
      NotificationManager.success('Success', 'Registration');
    }
    if (!this.props.users.error && nextProps.users.error) {
      NotificationManager.error(nextProps.users.error, 'Registration');
    }
  }

  render() {
    return <div className="panel-default col-xs-6 reg-form">
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
