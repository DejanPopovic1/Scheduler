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
    var isRedirectToSchedulerAllowed = (localStorage.getItem("userid").replace(/['"]+/g, '') === "4");
    //var test = localStorage.getItem("userid");
    //var test2 = test.replace(/['"]+/g, '')
    //debugger;
    //These links ONLY change the URL - it is not their job to change anything else whatsoever
    return (
        <div>
            <Navbar className="color-nav">
                <Navbar.Brand style={{ color: '#fff' }} href="/Schedule">Schedule</Navbar.Brand>
                {isRedirectToSchedulerAllowed && <div><Navbar.Brand style={{ color: '#fff' }} href="/SchedulerTool">Scheduler Tool</Navbar.Brand></div>}
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