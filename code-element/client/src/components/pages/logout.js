import React, { Component } from 'react';
import { Link } from "react-router-dom";
// import '../App.scss';


export default class LogOut extends Component {
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
            alert("Oops, SignIn failed");
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
           
                <div className="search">
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <center><img src="https://5.imimg.com/data5/NO/NB/QE/SELLER-75017778/3669579-500x500.jpg" alt="Closing Tag"/>
                   <br></br>
                    {this.state.isLoggedIn && <Link to="/">
                        <button className="btn" onClick={this.logOut}>SignIn</button>
                    </Link>}
                    </center>
                </div>
           
        )
    }
}
