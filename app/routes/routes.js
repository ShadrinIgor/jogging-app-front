'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//import AuthUtil from '../utils/AuthUtil';
//import * as authActions from '../actions/auth';
import {Redirect, Route, Switch} from 'react-router-dom';

import appRoute from '../components/App';

class Routes extends Component {

/*  componentWillMount() {
    const {userActions} = this.props;

    if (AuthUtil.hasAuthCookie()) {
      userActions.retrieveInformationAboutUser();
    }
  }

  shouldComponentUpdate_(nextProps) {
    const {user} = this.props;

    console.log(user.registrationStep, nextProps.user.registrationStep);

    return user.registrationStep !== nextProps.user.registrationStep
  }*/

  render() {
    return (
      <Switch>
        <Route exact path='/' component={appRoute}/>
      </Switch>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes)