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
import AllRecords from './AllRecords';
import AllRecordForm from './AllRecordForm';
import notFoundRoute from './NotFound';

import Header from '../components/Header';
import Menu from '../components/Menu';
import {setAuth} from '../actions/AuthActions';

class Routes extends Component {
  constructor() {
    super();
    this.state = {user:{role: 1}};
  }

  componentWillMount() {
    if (isAuth() && !this.props.auth.login) {
      let {token, user} = getLocalStoreData();
      this.props.setAuth({token, user: JSON.parse(user)});
      this.setState({user: JSON.parse(user)});
    }
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate', nextProps.auth.data);
    if(!this.state.user.id && nextProps.auth.data){
      this.setState({user:  nextProps.auth.data.user});
      console.log('componentWillUpdate 2', nextProps.auth.data.user);
    }
  }

  render() {
    console.log('state', this.state);
    return (
      <div className="container">
        <Header />
        {isAuth() && <Menu role={this.state.user.role}/>}
        {isAuth() && <Switch>
          <Route exact path='/' render={props => (
            isAuth() ? <Records /> : <RegistrationForm />
          )}/>
          <Route exact path='/records' component={Records}/>
          <Route exact path='/recordForm' userRole={this.state.user.role} component={RecordForm}/>
          <Route exact path='/recordForm/:id' component={RecordForm}/>
          <Route exact path='/reports' component={Reports}/>
          <Route exact path='/users' component={Users}/>
          <Route exact path='/userForm' component={UserForm}/>
          <Route exact path='/userForm/:id' component={UserForm}/>
          <Route exact path='/allRecords' component={AllRecords}/>
          <Route exact path='/allRecordForm' component={AllRecordForm}/>
          <Route exact path='/allRecordForm/:id' component={AllRecordForm}/>
          <Route component={notFoundRoute}/>
        </Switch>}
        {!isAuth() && <RegistrationForm />}
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
    }
  })
)(Routes);