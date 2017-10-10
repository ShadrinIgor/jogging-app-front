import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Panel, Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import moment from 'moment';
import {NotificationManager, NotificationContainer} from 'react-notifications';
import {getList, deleteItem, clearStatus} from '../actions/RecordsActions';
import {getSpeed, getOrderIco} from '../utils/HelperUtil';

class Records extends Component {

  constructor() {
    super();
    this.state = {list: [], sort:{field:'', type: 'desc'}};
  }

  componentWillMount() {
    this.props.getList();
  }

  componentWillUpdate(nextProps, nestState) {
    if(nextProps.records.status === 'deleted') {
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
    let sort = {field, type: this.state.sort.type === 'asc' ? 'desc' : 'asc' };
    this.setState({...this.state, sort });
    console.log('1', this.props);
    this.props.getList(sort);
  }

  render() {
    const {records} = this.props;
    return <Panel header="Records" bsStyle="success">
      <NotificationContainer />
      <Table striped bordered condensed hover>
        <thead>
        <tr>
          <th>Data <a className={getOrderIco(this.state.sort, 'date')} onClick={this.sort.bind(this, 'date')}></a> </th>
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
                  <Link className="glyphicon glyphicon-pencil m-r-5" to={`/recordForm/${item._id}`} />
                  <a className="glyphicon glyphicon-trash" onClick={()=>{this.deleteRecord.call(this, item._id)}} />
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
  }
}

export default connect(
  state => ({
    records: state.records
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
    }
  })
)(Records);
