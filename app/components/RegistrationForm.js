import React, {Component} from 'react';
import {Control, Errors, Form} from 'react-redux-form';

class RegistrationForm extends Component {
  handleSubmit() {
    console.log('handleSubmit');
  }

  render() {
    let error = false;
    const longEnough = (val) => val && val.length > 8;
    const allFieldRequired = (vals) => {
      error = true;
      return vals.name && vals.surname && vals.email && vals.password && vals.confirmPassword;
    };
    return <Form model="registrationForm" onSubmit={(val) => this.handleSubmit(val)}
                 validators={{
                   '': {
                     allFieldRequired,
                     passwordsMatch: (vals) => {
                       console.log();
                       return !vals.password || !vals.confirmPassword || vals.password === vals.confirmPassword
                     }
                   },
                   password: {longEnough},
                   confirmPassword: {longEnough}
                 }}>
      <h2>1</h2>
      <div className="panel-default col-xs-6 reg-form">
        <div className="row">
          <Errors
            model="registrationForm"
            show={{touched: true, focus: false}}
            wrapper={(props) => <div className="errors">{props.children}</div>}
            messages={{
              passwordsMatch: 'Password and confirm not match',
              allFieldRequired: 'All fields required'
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
          <Control.text type="email" model=".email" className="form-control" id="email" placeholder="Email"/>
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

export default RegistrationForm;