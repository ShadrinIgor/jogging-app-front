import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Panel, Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {clearStatus, deleteItem, getList} from '../actions/UsersActions';

class Users extends Component {

  constructor() {
    super();
    this.state = {list: []};
  }

  componentWillMount() {
    this.props.getList();
  }

  componentWillUpdate(nextProps, nestState) {
    if (nextProps.users.status === 'deleted') {
      NotificationManager.success('The user successfully deleted', 'Users');
      this.props.clearStatus();
    }
  }

  deleteUser(id) {
    if (confirm('Do you wont delete user?')) {
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
                  <Link className="glyphicon glyphicon-pencil m-r-5" to={`/userForm/${item._id}`}/>
                  <a className="glyphicon glyphicon-trash" onClick={() => {
                    this.deleteUser.call(this, item._id)
                  }}/>
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
        <Link className="btn btn-success" to="/userForm">Add new user</Link>
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
