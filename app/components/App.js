import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {Panel} from 'react-bootstrap';
import {authLogin} from '../actions/AuthActions';
import RegistrationForm from './RegistrationForm';

export default class App extends Component {
  constructor() {
    super();
    this.state = {email: '', password: ''};
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextProps.auth.error){
      NotificationManager.error(nextProps.auth.error, 'Auth error');
    }
  }

  setEmail() {
    this.setState({...this.state, email: this.refs.email.value});
  }

  setPassword() {
    this.setState({...this.state, password: this.refs.password.value});
  }

  logIn() {
    if(this.state.email && this.state.password){
      console.log('log', this.state);
      this.props.login(this.state.email, this.state.password)
    }
  }

  render() {
    return <div className="container">
      <NotificationContainer/>
      <div className="panel panel-default">
        <div className="panel-heading row">
          <div className="col-xs-6"><h2 className="m-t-no">Jogging app</h2></div>
          <div className="col-xs-6 auth-form text-right">
            <div className="form-group display-inline m-r-5">
              <input type="text" className="form-control" ref="email" placeholder="Email"
                     onChange={this.setEmail.bind(this)}/>
            </div>
            <div className="form-group display-inline m-r-5">
              <input type="password" className="form-control" ref="password" placeholder="Password"
                     onChange={this.setPassword.bind(this)}/>
            </div>
            <div className="form-group display-inline">
              <a className="btn btn-sm btn-success" onClick={this.logIn.bind(this)}>Log in</a>
            </div>
          </div>
        </div>
      </div>
      <RegistrationForm/>
    </div>
  }
}

export default connect(
  state => ({
    auth: state.auth
  }),
  dispatch => ({
    login: (email, password) => {
      dispatch(authLogin(email, password));
    }
  })
)(App);
