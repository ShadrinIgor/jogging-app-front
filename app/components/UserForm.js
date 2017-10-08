import React, {Component} from 'react';
import {Control, Errors, Form} from 'react-redux-form';
import {Link} from 'react-router-dom';
import {Panel} from 'react-bootstrap';
import {NotificationContainer} from 'react-notifications';
import {isEmail} from '../utils/ValidationUtil';

export default class UserForm extends Component {
  handleSubmit(val) {
    this.props.save(val);
  }

  render() {
    const longEnough = (val) => val && val.length > 7;
    const allFieldRequired = (vals) => vals.name && vals.surname && vals.email && vals.password;
    return <Panel header={this.props.userForm._id.length ? 'Update user' : 'Add user'} bsStyle="success">
      <Form model="userForm" onSubmit={(val) => this.handleSubmit.call(this, val)}
            validators={{
              '': {
                allFieldRequired,
                passwordsMatch: (vals) => !vals.password || !vals.confirmPassword || vals.password === vals.confirmPassword,
                incorrectEmail: (vals) => !vals.email || isEmail(vals.email),
                passwordLength: (vals) => !vals.password || longEnough(vals.password)
              }
            }}>

        <NotificationContainer/>
        <div className="row">
          <Errors
            model="userForm"
            show={{touched: true, focus: false}}
            wrapper={(props) => <div className="errors">{props.children}</div>}
            messages={{
              passwordsMatch: 'Password and confirm not match',
              allFieldRequired: 'All fields required',
              incorrectEmail: 'Incorrect email',
              passwordLength: 'Password mast be more 7 literal'
            }}
          />
          <div className="form-group col-xs-12">
            <Control.text type="text" model=".email" className="form-control" id="email" placeholder="Email"/>
          </div>
          <div className="form-group col-xs-6">
            <Control.text model=".name" className="form-control" id="inputEmail" placeholder="First name"/>
          </div>
          <div className="form-group col-xs-6">
            <Control.text model=".surname" className="form-control" id="surname" placeholder="Surname"/>
          </div>
        </div>

        <div className="form-group">
          <Control.text type="password" model=".password" className="form-control" id="password" placeholder="Password"
          />
        </div>
        <div className="form-group">
          <Control.select model=".role" className="form-control" id="role"
                        placeholder="Role">
            <option value="false">User</option>
            <option value="true">Admin</option>
          </Control.select>
        </div>
        <div className="pull-right">
          <Link className="btn btn-default m-r-5" to="/users">Cancel</Link>
          <button type="submit"
                  className="btn btn-success pull-right">{this.props.userForm._id.length ? 'Edit user' : 'Create user'}</button>
        </div>
      </Form>
    </Panel>
  }
}