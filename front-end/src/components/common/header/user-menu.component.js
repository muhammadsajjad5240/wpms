import React, { Component } from 'react';
// Import authService
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import App from '../../app';
class UserMenu extends Component {
    state = {
        name: 'ali'
    }
    showAlert = () => {
        alert('Hi');
    }
    removeStorage = () =>{
        sessionStorage.clear();
        window.location.reload();
    }
    render() {
        return (
            <li className="onhover-dropdown">
                {/* <App name="Ali" /> */}
                <div className="media  align-items-center">
                    <Link to='/dashboard/my-account'><span className="mr-5 txt-white" id="sign_in">My Account</span></Link>
                    {/* <img className="align-self-center pull-right mr-2" src={require("../../../assets/images/dashboard/user.png")} alt="header-user" /> */}
                    <div className="media-body">
                        <h6 className="m-0 txt-white f-16">
                            <Link to='/' onClick={this.removeStorage}>Log Out</Link>
                            {/* <i className="fa fa-angle-down pull-right ml-2"></i> */}
                        </h6>
                    </div>
                </div>
                {/* <ul className="profile-dropdown onhover-show-div p-20">
                    <li>
                        <i className="icon-user"></i>
                        Edit Profile
                    </li>
                    <li>
                        <i className="icon-power-off"></i>
                        Logout
                    </li>
                </ul> */}
            </li>
        );
    }
}
export default UserMenu