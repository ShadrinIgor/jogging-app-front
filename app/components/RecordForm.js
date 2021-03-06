import React, {Component} from 'react';
import {Control, Errors, Form} from 'react-redux-form';
import {Link} from 'react-router-dom';
import {Panel} from 'react-bootstrap';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import {NotificationContainer} from 'react-notifications';
import FieldError from '../components/FieldError';
import {validateNumber} from '../utils/ValidationUtil';
import 'react-day-picker/lib/style.css';

export default class RecordForm extends Component {
  constructor() {
    super();
    this.state = {status: ''};
  }

  handleSubmit(data) {
    this.props.save(data);
  }

  handleDayChange(date) {
    this.setState({status: ''});
    this.props.recordForm.date = date.format('DD.MM.YYYY');
    delete this.props.recordForm.errors.date;
    this.setState({status: 'update'});
  }

  validateNumberHandle(data) {
    const nameParam = data.target.name.split('.');
    const field = nameParam[1];
    validateNumber(field, data.target.value, this.props.recordForm.errors);
  }

  render() {
    const allFieldRequired = vals => {
      return vals.date && vals.distance && vals.time
    };
    const {errors} = this.props.recordForm;

    return <Panel header={this.props.recordForm._id.length ? "Update record" : "Add record"} bsStyle="success">
      <Form model="recordForm" onSubmit={(val) => this.handleSubmit.call(this, val)}
            validators={{
              '': {
                allFieldRequired
              }
            }}>

        <NotificationContainer/>
        <div className="row">
          <Errors
            model="state."
            show={{touched: true, focus: false}}
            wrapper={(props) => <div className="errors">{props.children}</div>}
            messages={{
              allFieldRequired: 'All fields required',
              incorrectEmail: 'Incorrect email'
            }}
          />
        </div>
        <div className="form-group">
          <DayPickerInput
            name="recordForm.date"
            value={this.props.recordForm.date}
            readOnly="readonly"
            className="form-control"
            onDayChange={this.handleDayChange.bind(this)}
            format={'DD.MM.YYYY'}
            placeholder={`Example: ${moment().locale('en').format('DD.MM.YYYY')}`}/>
          <FieldError errors={errors.date}/>
        </div>
        <div className="form-group">
          <Control.text type="text" model=".distance" onChange={this.validateNumberHandle.bind(this)}
                        className="form-control" id="distance" placeholder="Distance"/>
          <FieldError errors={errors.distance}/>
        </div>
        <div className="form-group">
          <Control.text type="text" model=".time" onChange={this.validateNumberHandle.bind(this)}
                        className="form-control"
                        id="time" placeholder="Time"/>
          <FieldError errors={errors.time}/>
        </div>
        <div className="pull-right">
          <Link className="btn btn-default m-r-5" to="/">Cancel</Link>
          <button type="submit" disabled={Object.keys(errors).length ? 'disabled' : ''}
                  className="btn btn-success pull-right">{this.props.recordForm._id.length ? 'Update' : 'Create'}</button>
        </div>
      </Form>
    </Panel>
  }
}