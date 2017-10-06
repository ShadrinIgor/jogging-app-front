import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {Control, Errors, Form} from 'react-redux-form';
import {Link, Redirect} from 'react-router-dom';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import {Panel} from 'react-bootstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {_SUCCESS} from '../constants/baseTypes';
import {getRecord, save} from '../actions/RecordsActions';
import FieldError from '../components/FieldError';
import 'react-day-picker/lib/style.css';

class RecordForm extends Component {
  constructor() {
    super();
    this.state = {status: ''};
  }

  handleSubmit(data) {
    this.props.save(data);
  }

  handleDayChange(date) {
    this.setState({status:''});
    console.log('handleDayChange');
    // this.props.recordForm.date = date;
    this.props.recordForm.date = date.format('DD.MM.YYYY');
    delete this.props.recordForm.errors.date;
    this.setState({status:'update'});
  }

  deleteRecord(id) {
    /*    if(promt('Do you wont delete record?')){

     }*/
  }

  validateDate(data) {
    console.log('validateDate', data.target);
    this.setState({status:''});
    const field = data.target.name.split('.')[1];
    const newDate = moment(data.target.value, 'DD.MM.YYYY', true);
    this.props.recordForm[field] = moment(data.target.value, 'DD.MM.YYYY').format('DD.MM.YYYY');

    if (!newDate || !newDate.isValid() ) {
      console.log('invalid', data.target.value, field, newDate);
      this.props.recordForm.errors[field] = ['Incorrect date format, it should be DD.MM.YYYY'];
    } else {
      delete this.props.recordForm.errors[field];
    }
    this.setState({status:'update'});
  }

  validateNumber(data) {
    const reg = /([^0-9])+/;
    const nameParam = data.target.name.split('.');
    const field = nameParam[1];
    if (reg.test(data.target.value)) {
      this.props.recordForm.errors[field] = ['Incorrect format'];
    } else {
      delete this.props.recordForm.errors[field];
    }
  }

  render() {
    const allFieldRequired = vals => {
      return vals.date && vals.distance && vals.time
    };
    const {errors} = this.props.recordForm;
    console.log('errors', errors);
    return <Form model="recordForm" onSubmit={(val) => this.handleSubmit.call(this, val)}
                 validators={{
                   '': {
                     allFieldRequired
                   }
                 }}>

      <h1>Add record</h1>
      <NotificationContainer/>
      <div className="row">
        <Errors
          model="recordForm"
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
          className="form-control"
          onChange={this.validateDate.bind(this)}
          onDayChange={this.handleDayChange.bind(this)}
          format={'DD.MM.YYYY'}
          placeholder={`Example: ${moment().locale('en').format('DD.MM.YYYY')}`}/>
        <FieldError errors={errors.date}/>
      </div>
      <div className="form-group">
        <Control.text type="text" model=".distance" onChange={this.validateNumber.bind(this)}
                      className="form-control" id="distance" placeholder="Distance"/>
        <FieldError errors={errors.distance}/>
      </div>
      <div className="form-group">
        <Control.text type="text" model=".time" onChange={this.validateNumber.bind(this)} className="form-control"
                      id="time" placeholder="Time"/>
        <FieldError errors={errors.time}/>
      </div>
      <div className="pull-right">
        <Link className="btn btn-default m-r-5" to="/">Cancel</Link>
        <button type="submit" disabled={Object.keys(errors).length ? 'disabled' : ''}
                className="btn btn-success pull-right">{this.props.recordForm.id ? 'Create' : 'Update'}</button>
      </div>
    </Form>
  }
}

class FormSuccess extends Component {
  render() {
    return <Panel header="Registration successfully completed" bsStyle="success">
      Record added success.
    </Panel>
  }
}

class RForm extends Component {
  constructor() {
    super();
    this.state = {saved: false};
  }

  componentWillMount() {
    if (this.props.match.params.id) {
      this.props.getRecord(this.props.match.params.id);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (!this.props.recordForm.status && nextProps.recordForm.status === _SUCCESS) {
      this.setState({...this.state, saved: true});
      NotificationManager.success('Record success save', 'Form');
    }
    if (!Object.keys(this.props.recordForm.errors).length && Object.keys(nextProps.recordForm.errors).length) {
      NotificationManager.error('Form filling error', 'Form');
    }
  }

  render() {
    return <div className="panel-default col-xs-6 reg-form">
      {this.state.saved && <Redirect to="/"/>}
      {!this.state.saved && <RecordForm recordForm={this.props.recordForm} save={this.props.saveItem.bind()}/>}
    </div>
  }
}

export default connect(
  state => ({
    records: state.records,
    recordForm: state.recordForm
  }),
  dispatch => ({
    saveItem: (data) => {
      dispatch(save(data));
    },
    getRecord: (id) => {
      dispatch(getRecord(id));
    }
  })
)(RForm);
