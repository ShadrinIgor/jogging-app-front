'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, Switch} from "react-router-dom";
//import AuthUtil from '../utils/AuthUtil';
//import * as authActions from '../actions/auth';

import appRoute from '../components/App';
import cabinetRoute from '../components/Cabinet';
import notFoundRoute from '../components/NotFound';

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
      <div className="container">
        <Switch>
          <Route exact path='/' component={appRoute}/>
          <Route exact path='/cabinet' component={cabinetRoute}/>
          <Route component={notFoundRoute}/>
        </Switch>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes)