import React, {Component} from 'react';
import {Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class Menu extends Component {

  isActive(key) {
    return this.props.active === key;
  }

  render() {
    const {role} = this.props;
    return <div className="m-b-10">
      <Nav bsStyle="pills">
        <LinkContainer to="/" isActive={this.isActive.bind(this, '/')}><NavItem eventKey={1}>Recodrs</NavItem></LinkContainer>
        <LinkContainer to="/reports" isActive={this.isActive.bind(this, '/reports')}><NavItem eventKey={2}>Reports</NavItem></LinkContainer>
        {(role === 2 || role === 3) && <LinkContainer to="/users" isActive={this.isActive.bind(this, '/users')}><NavItem eventKey={3}>Users</NavItem></LinkContainer>}
        {role === 3 && <LinkContainer to="/allRecords" isActive={this.isActive.bind(this, '/allRecords')}><NavItem eventKey={4} >All Records</NavItem></LinkContainer>}
      </Nav>
    </div>
  }
}

export default Menu;