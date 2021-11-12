import React from 'react';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import './NavBarStyle.css';

export function NavigationBar() {
    const history = useHistory();
    function handleLogout() {
        localStorage.clear();
        history.push('/login');
    }
    return (
        <div>
            <Navbar className="color-nav">
                <Navbar.Brand style={{ color: '#fff' }}  href="/Schedule">Schedule</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Item><Nav.Link style={{ color: '#fff' }} href="/Home">Home</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link style={{ color: '#fff' }} href="/Contact">Contact</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link style={{ color: '#fff' }} onClick={handleLogout}>Logout</Nav.Link></Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default NavigationBar;