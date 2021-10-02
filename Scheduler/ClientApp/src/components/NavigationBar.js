import React from 'react';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import './NavBarStyle.css';

//const Styles = styled.div`
//  .navbar { background-color: #0066fc; }
//  a, .navbar-nav, .navbar-light .nav-link {
//    color: #9FFFCB;
//    &:hover { color: white; }
//  }
//  .navbar-brand {
//    font-size: 1.4em;
//    color: #9FFFCB;
//    &:hover { color: white; }
//  }
//`;

export function NavigationBar() {
    return (
        <div>
            <Navbar className style={{ backgroundColor: '#3c619a' }}>
                <Navbar.Brand style={{ color: '#fff' }}  href="/Home/Schedule">Schedule</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                {/* <Form className="form-center">
          <FormControl type="text" placeholder="Search" className="" />
        </Form> */}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Item><Nav.Link style={{ color: '#fff' }} href="/Home/Homecontent">Home</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link style={{ color: '#fff' }} href="/Home/Contact">Contact</Nav.Link></Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default NavigationBar;