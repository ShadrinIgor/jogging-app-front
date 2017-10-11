import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Panel, Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import moment from 'moment';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {clearFormData, clearStatus, deleteItem, getList} from '../actions/RecordsActions';
import {getOrderIco, getSpeed} from '../utils/HelperUtil';
import DayPickerInput from 'react-day-picker/DayPickerInput';

class Records extends Component {

  constructor() {
    super();
    this.state = {list: [], sort: {field: '', type: 'desc'}, filter: {dateFrom: '', dateTo: ''}};
  }

  componentWillMount() {
    this.props.getList();
    this.props.clearFormData();
  }

  componentWillUpdate(nextProps, nestState) {
    if (nextProps.records.status === 'deleted') {
      NotificationManager.success('The record successfully deleted', 'Records');
      this.props.clearStatus();
    }
  }

  deleteRecord(id) {
    if (confirm('Do you wont delete record?')) {
      this.props.deleteItem(id);
    }
  }

  sort(field) {
    let sort = {field, type: this.state.sort.type === 'asc' ? 'desc' : 'asc'};
    this.setState({...this.state, sort});
    this.props.getList(sort, this.state.filter);
  }

  handleDayChange() {
    this.setState(
      {...this.state, filter: {dateFrom: this.refs.dateFrom.input.value, dateTo: this.refs.dateTo.input.value}});
  }

  filter() {
    this.props.getList(this.state.sort, this.state.filter);
  }

  clearDateFrom() {
    this.setState({...this.state, filter: {...this.state.filter, dateFrom: ''}});
  }

  clearDateTo() {
    this.setState({...this.state, filter: {...this.state.filter, dateTo: ''}});
  }

  render() {
    const {records} = this.props;
    return <div>
      <Panel bsStyle="default">

        <div className="form-inline pull-right">
          <div className="form-group col-xs-5">
            <div>
              <DayPickerInput
                ref="dateFrom"
                value={this.state.filter.dateFrom}
                readOnly="readonly"
                className="form-control"
                onDayChange={this.handleDayChange.bind(this)}
                format={'DD.MM.YYYY'}
                placeholder={`Date from`}/>
              {this.state.filter.dateFrom &&
              <a title="Clear field" className="btn btn-danger clearDateButton" onClick={this.clearDateFrom.bind(this)}>X</a> }
            </div>
          </div>
          <div className="form-group col-xs-5">
            <div>
              <DayPickerInput
                ref="dateTo"
                value={this.state.filter.dateTo}
                readOnly="readonly"
                className="form-control"
                onDayChange={this.handleDayChange.bind(this)}
                format={'DD.MM.YYYY'}
                placeholder={`Date to`}/>
              {this.state.filter.dateTo && <a title="Clear field" className="btn btn-danger clearDateButton"
                                              onClick={this.clearDateTo.bind(this)}>X</a> }
            </div>
          </div>
          <div className="form-group col-xs-2">
            <button className="btn btn-success" onClick={this.filter.bind(this)}>Filter</button>
          </div>
        </div>
      </Panel>
      <Panel header="Records" bsStyle="success">
        <NotificationContainer />
        <Table striped bordered condensed hover>
          <thead>
          <tr>
            <th>Data <a className={getOrderIco(this.state.sort, 'date')} onClick={this.sort.bind(this, 'date')}></a>
            </th>
            <th>Distance (Metres)</th>
            <th>Time</th>
            <th>Average speed(Km/hr)</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {
            records.items && records.items.map(item => {
              return (
                <tr key={item._id}>
                  <td>{moment(item.date).format('ll')}</td>
                  <td>{item.distance}</td>
                  <td>{item.time}</td>
                  <td>{getSpeed(item.distance, item.time)}</td>
                  <td className="text-center">
                    <Link className="glyphicon glyphicon-pencil m-r-5" to={`/recordForm/${item._id}`}/>
                    <a className="glyphicon glyphicon-trash" onClick={() => {
                      this.deleteRecord.call(this, item._id)
                    }}/>
                  </td>
                </tr>
              )
            })
          }
          {
            (!records.items || !records.items.length) && <tr>
              <td colSpan="5" className="text-center"><p>No have items</p></td>
            </tr>
          }
          </tbody>
        </Table>
        <div className="pull-right">
          <Link className="btn btn-success" to="/recordForm">Add new record</Link>
        </div>
      </Panel>
    </div>
  }
}

export default connect(
  state => ({
    records: state.records
  }),
  dispatch => ({
    getList: (sort, filter) => {
      dispatch(getList(sort, filter));
    },
    deleteItem: (id) => {
      dispatch(deleteItem(id));
    },
    clearStatus: () => {
      dispatch(clearStatus());
    },
    clearFormData: () => {
      dispatch(clearFormData());
    }
  })
)(Records);
