import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Panel} from 'react-bootstrap';

class NotFound extends Component {
  render() {
    return <Panel header="Page not found" bsStyle="danger">
      This is page not found
    </Panel>
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    createUser: (data) => {}
  })
)(NotFound);
