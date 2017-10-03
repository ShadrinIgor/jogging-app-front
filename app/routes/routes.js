'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {getLocalStoreData, isAuth} from '../utils/AuthUtil';
import RegistrationForm from '../components/RegistrationForm';
import Header from '../components/Header';
import Cabinet from '../components/Cabinet';
import notFoundRoute from '../components/NotFound';
import {setAuth} from '../actions/AuthActions';

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
        <Switch>
          <Route exact path='/' render={props => (
            isAuth() ? <Cabinet /> : <RegistrationForm />
          )}/>
          <Route exact path='/cabinet' component={Cabinet}/>
          <Route component={notFoundRoute}/>
        </Switch>
      </div>
    )
    /*      <Link to="/">Home</Link>
     <Link to="/cabinet">cabinet</Link>*/
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