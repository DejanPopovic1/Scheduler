import React from 'react';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import './NavBarStyle.css';

export function NavigationBar() {
    return (
        <div>
            <Navbar className="color-nav">
                <Navbar.Brand style={{ color: '#fff' }}  href="/Home/Schedule">Schedule</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
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