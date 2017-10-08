'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {getLocalStoreData, isAuth} from '../utils/AuthUtil';
import RegistrationForm from './RegistrationForm';
import Records from './Records';
import RecordForm from './RecordForm';
import Reports from './Reports';
import Users from './Users';
import UserForm from './UserForm';
import notFoundRoute from './NotFound';

import Header from '../components/Header';
import Menu from '../components/Menu';
import {setAuth} from '../actions/AuthActions';

class Routes extends Component {
  componentWillMount(){
    if(isAuth() && !this.props.auth.login){
      let {token, user} = getLocalStoreData();
      this.props.setAuth({token, user: JSON.parse(user)});
    }
  }

  render() {
    return (
      <div className="container">
        <Header />
        <Menu />
        <Switch>
          <Route exact path='/' render={props => (
            isAuth() ? <Records /> : <RegistrationForm />
          )}/>
          <Route exact path='/records' component={Records}/>
          <Route exact path='/recordForm' component={RecordForm}/>
          <Route exact path='/recordForm/:id' component={RecordForm}/>
          <Route exact path='/reports' component={Reports}/>
          <Route exact path='/users' component={Users}/>
          <Route exact path='/userForm' component={UserForm}/>
          <Route exact path='/userForm/:id' component={UserForm}/>
          <Route component={notFoundRoute}/>
        </Switch>
      </div>
    )
  }
}

export default connect(
  state => ({
    auth: state.auth
  }),
  dispatch => ({
    setAuth: (data) => {
      dispatch(setAuth(data));
    },
  })
)(Routes);