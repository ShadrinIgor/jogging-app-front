import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Panel, Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import moment from 'moment';
import {NotificationManager, NotificationContainer} from 'react-notifications';
import {getList, deleteItem, clearStatus} from '../actions/UsersActions';
import {getSpeed} from '../utils/HelperUtil';

class Users extends Component {

  constructor() {
    super();
    this.state = {list: []};
  }

  componentWillMount() {
    this.props.getList();
  }

  componentWillUpdate(nextProps, nestState) {
    if(nextProps.users.status === 'deleted') {
      NotificationManager.success('The record successfully deleted', 'Users');
      this.props.clearStatus();
    }
  }

  deleteRecord(id) {
    if (confirm('Do you wont delete record?')) {
      this.props.deleteItem(id);
    }
  }

  render() {
    const {users} = this.props;
    return <Panel header="Users" bsStyle="success">
      <NotificationContainer />
      <Table striped bordered condensed hover>
        <thead>
        <tr>
          <th>Email</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {
          users.items && users.items.map(item => {
            return (
              <tr key={item._id}>
                <td>{item.email}</td>
                <td>{item.name}</td>
                <td>{item.surname}</td>
                <td className="text-center">
                  <Link className="glyphicon glyphicon-pencil m-r-5" to={`/recordForm/${item._id}`} />
                  <a className="glyphicon glyphicon-trash" onClick={()=>{this.deleteRecord.call(this, item._id)}} />
                </td>
              </tr>
            )
          })
        }
        {
          (!users.items || !users.items.length) && <tr>
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
    users: state.users
  }),
  dispatch => ({
    getList: () => {
      dispatch(getList());
    },
    deleteItem: (id) => {
      dispatch(deleteItem(id));
    },
    clearStatus: () => {
      dispatch(clearStatus());
    }
  })
)(Users);
