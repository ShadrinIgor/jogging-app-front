import React, {Component} from 'react';
import {Nav, NavItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class Menu extends Component {
  render() {
    const {isAdmin} = this.props;
    return <div className="m-b-10">
      <Nav bsStyle="pills">
        <LinkContainer to="/"><NavItem eventKey={1}>Recodrs</NavItem></LinkContainer>
        <LinkContainer to="/reports"><NavItem eventKey={2}>Reports</NavItem></LinkContainer>
        {isAdmin && <LinkContainer to="/users"><NavItem eventKey={3}>Users</NavItem></LinkContainer>}
        {isAdmin && <LinkContainer to="/all_records"><NavItem eventKey={4}>All Records</NavItem></LinkContainer>}
      </Nav>
    </div>
  }
}

export default Menu;