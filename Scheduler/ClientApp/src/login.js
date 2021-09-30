import React from 'react';
import './login.css';

function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.testFunc = testFunc.bind(this);
        this.FormButton = FormButton.bind(this);
    }

    handleLogin = (event) => {
        event.preventDefault();
        fetch("authenticate/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: event.target[0].value, password: event.target[1].value })
        });
    }

    render() {
        return (
            <div id="background">
                <div id="loginform">
                    <FormHeader title="Login" />
                    <LoginForm handleLogin={this.handleLogin} />
                    <OtherMethods />
                </div>
            </div>
        )
    }
}



const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
);

const LoginForm = props => (
    <div>
        <form onSubmit={props.handleLogin}>
                <FormInput description="Username" placeholder="Enter your username" type="text" name="username" />
                <FormInput description="Password" placeholder="Enter your password" type="password" name="password" />
                <FormButton title="Log in" />
        </form>
    </div>
);

const FormButton = props => {
    return (
        <div id="button" class="centeredRow">
            <input id="colourfulButton" type="submit" value={props.title} />
        </div>
    );
};

const FormInput = props => (
    <div class="centeredRow">
        <label id="colourfulLabel">{props.description}</label>
        <input type={props.type} placeholder={props.placeholder} name={props.name} />
    </div>
);

const OtherMethods = props => (
    <div id="alternativeLogin">
        <label>Or sign in with:</label>
        <div id="iconGroup">
            <Facebook />
            <Twitter />
            <Google />
        </div>
    </div>
);

const Facebook = props => (
    <a href="#" id="facebookIcon"></a>
);

const Twitter = props => (
    <a href="#" id="twitterIcon"></a>
);

const Google = props => (
    <a href="#" id="googleIcon"></a>
);

const testFunc = () => (
    "test String"
);


export default Login

