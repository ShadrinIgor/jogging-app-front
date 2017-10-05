import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Control, Errors, Form} from 'react-redux-form';
import {Redirect} from 'react-router-dom';
import {Panel} from 'react-bootstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {_SUCCESS} from '../constants/baseTypes';
import {save, getRecord} from '../actions/RecordsActions';
import FieldError from '../components/FieldError';

class RecordForm extends Component {
  handleSubmit(data) {
    this.props.save(data);
  }

  render() {
    const allFieldRequired = vals => {
      return vals.date && vals.distance && vals.time
    };
    const {errors} = this.props;
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
        <Control.text type="text" model=".date" className="form-control" id="date" placeholder="Date"/>
        <FieldError errors={errors.date} />
      </div>
      <div className="form-group">
        <Control.text type="text" model=".distance" className="form-control" id="distance" placeholder="Distance"/>
        <FieldError errors={errors.distance} />
      </div>
      <div className="form-group">
        <Control.text type="text" model=".time" className="form-control" id="time" placeholder="Time"/>
        <FieldError errors={errors.time} />
      </div>
      <button type="submit" className="btn btn-success pull-right">Create</button>
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
    if(this.props.match.params.id){
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
      {!this.state.saved && <RecordForm errors={this.props.recordForm.errors} save={this.props.saveItem.bind()}/>}
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
