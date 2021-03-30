import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
// import "../App.scss";
import Home from "./Home";


class Login extends Component {
    constructor(props) {
        super();
        this.state = {
            isLoggedIn: false,
        };
    }
    componentDidMount() {
        const user = localStorage.getItem("user");
        if (user) {
            this.setState({
                isLoggedIn: true,
            });
        }
    }
    responseGoogle = (response) => {
        if (!response || !response.accessToken) {
            alert("sorry, SignIn failed");
            return;
        }
        const user = {
            token: response.accessToken,
            name: response.profileObj,
        };
        localStorage.setItem("user", JSON.stringify(user));
        this.setState({
            isLoggedIn: true,
        });
    };
    logOut = () => {
        localStorage.removeItem("user");
        this.setState({
            isLoggedIn: false,
        });
    };

    render() {
        return (
            <div class="login">
            <center>
                <img src="https://i.gifer.com/origin/59/5922334d960a131e3c0f29bf5ccac489_w200.gif" alt="Login" />
                <div class="card-body md-col-4">
                    {!this.state.isLoggedIn && (
                        <GoogleLogin
                            clientId="1086679201918-mcj8milq7ubvuq7cinigi1cf4kfcv32c.apps.googleusercontent.com"
                            buttonText="Log In With Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={"single_host_origin"}
                        />
                    )}
                    {this.state.isLoggedIn && (
                        <Redirect to="/home" component={Home} />
                    )}
                </div>
                <div className="foot">
                    <h1>Powered by AttaniU</h1>
                </div>
            </center>
            </div>
        );
    }
}

export default Login;
