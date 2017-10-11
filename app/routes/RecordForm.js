import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form} from 'react-redux-form';
import {Redirect} from 'react-router-dom';
import {NotificationManager} from 'react-notifications';
import {_SUCCESS} from '../constants/baseTypes';
import {getRecord, save} from '../actions/RecordsActions';
import RecordForm from '../components/RecordForm';
import 'react-day-picker/lib/style.css';

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
      this.props.recordForm.errors = [];
    }
  }

  render() {
    return <div className="panel-default col-xs-6 center-form">
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
