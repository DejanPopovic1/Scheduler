import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
//import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
//import { userActions } from '../../../_actions';
//import groupLogo from '../../../assets/img/products/fennec-group-logo.png'

class Login extends Component {
    constructor(props) {
        super(props);

        //this.props.dispatch(userActions.logout());

        this.state = {
            email: '',
            password: '',
            submited: false,
            loggingIn: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    forgotPasswordClick() {
        window.location.href = '/forgotpassword';
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.setState({ submited: true });
        this.setState({ loggingIn: true })
        const { email, password } = this.state;
        const { dispatch } = this.props;
        //if (email && password) {
        //    await dispatch(userActions.login(email, password));

        //}

    }

    render() {
        const { alert } = this.props;
        const { email, password, submited, loggingIn } = this.state;
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="5">
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <Form name="form" onSubmit={this.handleSubmit}>
                                            <h1>Login</h1>
                                            <p className="text-muted">Sign In to your account</p>
                                            {
                                                <div className="text-danger">Email is required</div>
                                            }
                                            {
                                                <div className="text-danger">Password is required</div>
                                            }
                                            {
                                                <div className="text-danger">alert message</div>
                                            }
                                            <InputGroup className="mb-3 mt-2">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-user" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text" placeholder="Email" name="email" autoComplete="email" value={email} onChange={this.handleChange} />
                                            </InputGroup>
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-lock" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="password" placeholder="Password" name="password" autoComplete="current-password" value={password} onChange={this.handleChange} />
                                            </InputGroup>
                                            <Row>
                                                <Col xs="6">
                                                    <Button color="primary" className="px-4">Login</Button>
                                                    {
                                                        <img className="ml-3" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                                    }
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <Button color="link" onClick={this.forgotPasswordClick} className="px-0">Forgot password?</Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </CardGroup>

                            <Row className="pt-4 pb-2 text-muted justify-content-center">Impressed? See our other product offerings below</Row>
                            <CardGroup className="m-3">
                                <Card>
                                    <CardBody className="p-1">
                                        <a href="https://fennecgroup.co.za" target="_blank" rel="noopener noreferrer">
                                            <Row className="align-items-center justify-content-center">

                                                {/*<img src={groupLogo} height="auto" width="33%" alt="Fennec Website https://fennecgroup.co.za" />*/}

                                            </Row>
                                        </a>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                    <NotificationContainer />
                </Container>

            </div >
        );
    }
}

export default Login

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    const { alert } = state;
    return {
        loggingIn, alert
    };
}

//const connectedLoginPage = connect(mapStateToProps)(Login);


//export { connectedLoginPage as Login };
