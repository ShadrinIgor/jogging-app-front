import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Control, Errors, Form, actions} from 'react-redux-form';
import {createUser} from '../actions/UsersActions';
import {isEmail} from '../utils/ValidationUtil';

class RegistrationForm extends Component {
  handleSubmit(val) {
    console.log(this.props, val, actions);
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
      <div className="panel-default col-xs-6 reg-form">
        <div className="row">
          <Errors
            model="registrationForm"
            show={{touched: true, focus: false}}
            wrapper={(props) => <div className="errors">{props.children}</div>}
            messages={{
              passwordsMatch: 'Password and confirm not match',
              allFieldRequired: 'All fields required',
              incorrectEmail: 'Incorrect email',
              passwordLength: 'Password mast be more 7 literal',
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
      </div>
    </Form>
  }
}

export default connect(
  state => ({
    auth: state.auth
  }),
  dispatch => ({
    createUser: (data) => {
      dispatch(createUser(data));
    },

  })
)(RegistrationForm);
