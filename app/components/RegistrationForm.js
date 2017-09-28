import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Control, Form } from 'react-redux-form';

class RegistrationForm extends Component {
  handleSubmit() {
    console.log('handleSubmit');
  }

  render() {
    return <Form model="registrationForm" onSubmit={(val) => this.handleSubmit(val)}>
        <div className="panel-default col-xs-6 reg-form">
        <div className="row">
          <div className="form-group col-xs-6">
            <Control.text model=".name" className="form-control" id="inputEmail" placeholder="First name" />
          </div>
          <div className="form-group col-xs-6">
            <Control.text model=".surname" className="form-control" id="surname" placeholder="Surname" />
          </div>
        </div>
        <div className="form-group">
          <input type="email" className="form-control" id="email" placeholder="Email"/>
        </div>
        <div className="form-group">
          <input type="password" className="form-control" id="inputPassword" placeholder="Password"/>
        </div>
        <div className="form-group">
          <input type="password" className="form-control" id="inputPassword" placeholder="Repeat password"/>
        </div>
        <button className="btn btn-success pull-right">Create an account</button>
      </div>
    </Form>
  }
}

export default RegistrationForm;