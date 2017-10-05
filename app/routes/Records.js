import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Panel, Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {getList} from '../actions/RecordsActions';

class Records extends Component {

  componentWillMount() {
    this.props.getList();
  }

  render() {
    const {records} = this.props;
    console.log('records', records);
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
            (
              <tr>
                <td>{item.id}</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td className="text-center">
                  <a className="glyphicon glyphicon-pencil m-r-5" aria-hidden="true"></a>
                  <a className="glyphicon glyphicon-trash" aria-hidden="true"></a>
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
    }
  })
)(Records);
