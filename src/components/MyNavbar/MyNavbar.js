import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import './MyNavbar.scss';

class MyNavbar extends React.Component {
  state = {
    isOpen: false,
  };

  render() {
    const { isAuthed, logoutClickEvent } = this.props;
    return (
      <div className="my-navbar">
      <Navbar color="black" dark expand="md">
          <NavbarBrand href="/">GEAR STOCK</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <NavItem>
              { isAuthed ? <NavLink tag={RRNavLink} to='/overview'>OVERVIEW</NavLink> : ''}
            </NavItem>
              <NavItem>
                { isAuthed ? <NavLink onClick={logoutClickEvent}>LOGOUT</NavLink> : ''}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

       </div>
    );
  }
}

export default MyNavbar;
