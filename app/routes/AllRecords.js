import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Panel, Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import moment from 'moment';
import {NotificationManager, NotificationContainer} from 'react-notifications';
import {getList, deleteItem, clearStatus, clearFormData} from '../actions/AllRecordsActions';
import {getSpeed, getOrderIco} from '../utils/HelperUtil';

class AllRecords extends Component {

  constructor() {
    super();
    this.state = {list: [], sort:{field:'', type: 'desc'}};
  }

  componentWillMount() {
    this.props.getList();
    this.props.clearFormData();
  }

  componentWillUpdate(nextProps, nestState) {
    if(nextProps.allRecords.status === 'deleted') {
      NotificationManager.success('The record successfully deleted', 'All records');
      this.props.clearStatus();
    }
  }

  deleteRecord(id) {
    if (confirm('Do you wont delete record?')) {
      this.props.deleteItem(id);
    }
  }

  sort(field) {
    let sort = {field, type: this.state.sort.type === 'asc' ? 'desc' : 'asc' };
    this.setState({...this.state, sort });
    this.props.getList(sort);
  }

  render() {
    const {allRecords} = this.props;
    return <Panel header="All records" bsStyle="success">
      <NotificationContainer />
      <Table striped bordered condensed hover>
        <thead>
        <tr>
          <th>Email </th>
          <th>Data <a className={getOrderIco(this.state.sort, 'date')} onClick={this.sort.bind(this, 'date')}></a></th>
          <th>Distance (Metres)</th>
          <th>Time</th>
          <th>Average speed(Km/hr)</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {
          allRecords.items && allRecords.items.map(item => {
            return (
              <tr key={item._id}>
                <td>{item.email}</td>
                <td>{moment(item.date).format('ll')}</td>
                <td>{item.distance}</td>
                <td>{item.time}</td>
                <td>{getSpeed(item.distance, item.time)}</td>
                <td className="text-center">
                  <Link className="glyphicon glyphicon-pencil m-r-5"  to={`/allRecordForm/${item._id}`} />
                  <a className="glyphicon glyphicon-trash" onClick={()=>{this.deleteRecord.call(this, item._id)}} />
                </td>
              </tr>
            )
          })
        }
        {
          (!allRecords.items || !allRecords.items.length) && <tr>
            <td colSpan="6" className="text-center"><p>No have items</p></td>
          </tr>
        }
        </tbody>
      </Table>
      <div className="pull-right">
        <Link className="btn btn-success" to="/allRecordForm" >Add new record</Link>
      </div>
    </Panel>
  }
}

export default connect(
  state => ({
    allRecords: state.allRecords
  }),
  dispatch => ({
    getList: (sort) => {
      dispatch(getList(sort));
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
)(AllRecords);
