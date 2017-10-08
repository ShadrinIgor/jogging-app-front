import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Panel, Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import moment from 'moment';
import {getList, deleteItem} from '../actions/RecordsActions';

class Records extends Component {

  constructor() {
    super();
    this.state = {list: []};
  }

  componentWillMount() {
    this.props.getList();
  }

  getSpeed(distance, time) {
    let speed = 0;
    const newDistance = (distance / 1000),
      newTime = (time / 60);

    if (distance && time) {
      speed = (newDistance / newTime).toFixed(2);
    }
    return speed;
  }

  deleteRecord(id) {
    if (confirm('Do you wont delete record?')) {
      deleteItem(id);
    }
  }

  render() {
    const {records} = this.props;
    return <Panel header="Records" bsStyle="success">
      <Table striped bordered condensed hover>
        <thead>
        <tr>
          <th>Data</th>
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
                <td>{this.getSpeed(item.distance, item.time)}</td>
                <td className="text-center">
                  <Link className="glyphicon glyphicon-pencil m-r-5" to={`/recordForm/${item._id}`} />
                  <a className="glyphicon glyphicon-trash" onClick={this.deleteRecord.bind(this)} />
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
    getList: () => {
      dispatch(getList());
    },
    deleteItem: () => {
      dispatch(deleteItem());
    }
  })
)(Records);
