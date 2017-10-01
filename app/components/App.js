import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {authLogin, logOut} from '../actions/AuthActions';
import RegistrationForm from './RegistrationForm';
import {getLocalStoreData, clearLocalStoreData} from '../utils/AuthUtil';

class Logout extends Component {
  render() {
    return <div className="form-group display-inline">
        <a className="btn btn-sm btn-success" onClick={this.props.logOut}>Log out</a>
      </div>
  }
}

class Login extends Component {
  constructor() {
    super();
    this.state = {email: '', password: ''};
  }

  setEmail() {
    this.setState({...this.state, email: this.refs.email.value});
  }

  setPassword() {
    this.setState({...this.state, password: this.refs.password.value});
  }

  logInAction() {
    if (this.state.email && this.state.password) {
      this.props.login(this.state.email, this.state.password)
    }
  }

  render() {
    return <div>
      <div className="form-group display-inline m-r-5">
        <input type="text" className="form-control" ref="email" placeholder="Email"
               onChange={this.setEmail.bind(this)}/>
      </div>
      <div className="form-group display-inline m-r-5">
        <input type="password" className="form-control" ref="password" placeholder="Password"
               onChange={this.setPassword.bind(this)}/>
      </div>
      <div className="form-group display-inline">
        <a className="btn btn-sm btn-success" onClick={this.logInAction.bind(this)}>Log in</a>
      </div>
    </div>
  }
}

export default class App extends Component {
  constructor() {
    super();
    this.state = {localStore: getLocalStoreData()};
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.auth.error) {
      NotificationManager.error(nextProps.auth.error, 'Auth error');
    }

    console.log(nextProps.auth.login, !this.props.auth.login);
    if (nextProps.auth.login && !this.props.auth.login) {
      console.log('ОБновл');
      this.setState({...this.state, localStore: getLocalStoreData()});
    }
  }

  logOut() {
    console.log('Удаляем');
    this.setState({...this.state, localStore: {}});
    clearLocalStoreData();
    logOut();
  }

  render() {
    return <div className="container">
      <NotificationContainer/>
      <div className="panel panel-default">
        <div className="panel-heading row">
          <div className="col-xs-6"><h2 className="m-t-no">Jogging app</h2></div>
          <div className="col-xs-6 auth-form text-right">
            {!this.state.localStore.token && <Login login={this.props.login.bind(this)}/>}
            {this.state.localStore.token && <Logout logOut={this.logOut.bind(this)}/>}
          </div>
        </div>
      </div>
      -{this.state.localStore.token}-
      <RegistrationForm create-user={this.props.createUser}/>
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
