import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Panel, Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import moment from 'moment';
import {NotificationManager, NotificationContainer} from 'react-notifications';
import {getReports} from '../actions/ReportsActions';
import {getSpeed} from '../utils/HelperUtil';

class Reports extends Component {

  constructor() {
    super();
    this.state = {list: []};
  }

  componentWillMount() {
    this.props.getReports();
  }

  render() {
    const {reports} = this.props;
    return <Panel header="Reports" bsStyle="success">
      <NotificationContainer />
      <Table striped bordered condensed hover>
        <thead>
        <tr>
          <th>Week</th>
          <th>Average distance (Metres)</th>
          <th>Average speed(Km/hr)</th>
        </tr>
        </thead>
        <tbody>
        {
          reports.items && reports.items.map(item => {
            return (
              <tr key={item.index}>
                <td>{item.index}</td>
                <td>{item.distance}</td>
                <td>{getSpeed(item.distance, item.time)}</td>
              </tr>
            )
          })
        }
        {
          (!reports.items || !reports.items.length) && <tr>
            <td colSpan="5" className="text-center"><p>No have items</p></td>
          </tr>
        }
        </tbody>
      </Table>
    </Panel>
  }
}

export default connect(
  state => ({
    reports: state.reports
  }),
  dispatch => ({
    getReports: () => {
      dispatch(getReports());
    }
  })
)(Reports);
