import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form} from 'react-redux-form';
import {Redirect} from 'react-router-dom';
import {NotificationManager} from 'react-notifications';
import {_SUCCESS} from '../constants/baseTypes';
import {getRecord, save, } from '../actions/AllRecordsActions';
import AllRecordForm from '../components/AllRecordForm';
import 'react-day-picker/lib/style.css';

class ARForm extends Component {
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
    if (!this.props.allRecordForm.status && nextProps.allRecordForm.status === _SUCCESS) {
      this.setState({...this.state, saved: true});
      NotificationManager.success('Record success save', 'Form');
    }
    if (!Object.keys(this.props.allRecordForm.errors).length && Object.keys(nextProps.allRecordForm.errors).length) {
      NotificationManager.error('Form filling error', 'Form');
    }
  }

  render() {
    return <div className="panel-default col-xs-6 center-form">
      {this.state.saved && <Redirect to="/allRecords"/>}
      {!this.state.saved && <AllRecordForm allRecordForm={this.props.allRecordForm} users={this.props.allRecords.users} save={this.props.saveItem.bind()}/>}
    </div>
  }
}

export default connect(
  state => ({
    allRecords: state.allRecords,
    allRecordForm: state.allRecordForm
  }),
  dispatch => ({
    saveItem: (data) => {
      dispatch(save(data));
    },
    getRecord: (id) => {
      dispatch(getRecord(id));
    }
  })
)(ARForm);
