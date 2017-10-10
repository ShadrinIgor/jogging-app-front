import React, {Component} from 'react';
import {Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class Menu extends Component {
  render() {
    const {role} = this.props;
    return <div className="m-b-10">
      <Nav bsStyle="pills">
        <LinkContainer to="/"><NavItem eventKey={1}>Recodrs</NavItem></LinkContainer>
        <LinkContainer to="/reports"><NavItem eventKey={2}>Reports</NavItem></LinkContainer>
        {(role === 2 || role === 3) && <LinkContainer to="/users"><NavItem eventKey={3}>Users</NavItem></LinkContainer>}
        {role === 3 && <LinkContainer to="/allRecords"><NavItem eventKey={4}>All Records</NavItem></LinkContainer>}
      </Nav>
    </div>
  }
}

export default Menu;