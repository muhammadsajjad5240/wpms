import React, { Component } from 'react';
// Import custom components
import Header from './common/header/header.component';
import Sidebar from './common/sidebar/sidebar.component';
import Footer from './common/footer/footer.component';
import { Link } from 'react-router-dom';
import NewUser from './newUser';
let axios = require('axios');
const lableStyle = {
    color: '#000',
    fontSize: '14px',
    fontWeight: '700'
};
const inputStyle = {
    color: '#000',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid #ced4da'
};
const passwordShoww = {
    fontSize: '1.2em',
    marginTop: '-24px',
    marginLeft: '90%',
    position: 'absolute',
    color: 'black',
    cursor: 'pointer'

}
class App extends Component {
    constructor(props) {
        super(props);
        this.handleUserName = this.handleUserName.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleForGetUserName = this.handleForGetUserName.bind(this);
        this.handleForGetEmail = this.handleForGetEmail.bind(this);
        this.handleForGetPassword = this.handleForGetPassword.bind(this);
        this.state = {
            data: [],
            userName: '',
            password: '',
            forgetuserName: '',
            forgetemail: ''
        }
    }
    handleUserName = (e) => {
        this.setState({ userName: e.target.value });
    }
    handlePassword = (e) => {
        this.setState({ password: e.target.value });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let user = {
            username: this.state.userName,
            password: this.state.password
        }
        axios.post('/Admin/getAdmin', { user_name: this.state.userName, password: this.state.password })
            .then(res => {
                if (res.data.length === 0) {
                    alert("Incorrect User Name Or Password");
                }
                else {
                    document.getElementById('sign_in').style.display = 'none';
                    document.getElementById('body').style.display = 'block';
                }
            });
        sessionStorage.setItem("userData", JSON.stringify(user));
    }
    myfocus = (a) => {
        document.getElementById(a).style.border = "1px solid grey";
    }
    componentDidMount = () => {
        if (!sessionStorage["userData"]) {
            document.getElementById('sign_in').style.display = 'block';
            document.getElementById('body').style.display = 'none';
        }
        else {
            document.getElementById('sign_in').style.display = 'none';
            document.getElementById('body').style.display = 'block';
        }
        //     if(this.props.name === 'Ali'){
        //         document.getElementById('side_bar').style.display='block';
        //     }
    }
    signUp = () => {
        document.getElementById('sign_in').style.display = 'none';
        document.getElementById('sign_up').style.display = 'block';
    }
    showPassword = (e) => {
        e.preventDefault();
        let pwd = document.getElementById('_password');
        if (pwd.type === "text") {
            pwd.type = "password";
        }
        else {
            pwd.type = "text";
        }
    }
    forgetPassword = () => {
        document.getElementById('sign_in').style.display = 'none';
        document.getElementById('forget_password').style.display = 'block';
    }
    handleForGetUserName = (e) => {
        this.setState({ forgetuserName: e.target.value });
    }
    handleForGetEmail = (e) => {
        this.setState({ forgetemail: e.target.value });
    }
    handleForGetPassword = (e) => {
        e.preventDefault();
        let forgetname = document.getElementById('forget_uer_name').value;
        let forgetemail = document.getElementById('forget__email').value;
        let fullNamePattern = /^[a-z0-9]+$/;
        if (!fullNamePattern.test(forgetname)) {
            alert("Please enter valid user name");
        }
        else if( !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(forgetemail)){
            alert("Please enter valid email address");
        }
        else {
            axios.post('/Email/forgetPassword', { user_name: this.state.forgetuserName, forgetemail: this.state.forgetemail })
                .then(res => {
                    let a = res.statusText
                    if (a === "OK") {
                        alert("Your Credential has been sent to your regisered email");
                        window.location.replace('/');
                    }
                });
        }
    }
    render() {
        // const {name} = this.props;
        return (
            <div>
                <div id='sign_in'>
                    <form className='mt-5'>
                        <h2 className='text-center'>Sign In</h2>
                        <div class="form-row">
                            <div class="col-md-4 offset-md-4 mb-3">
                                <label for="fullName" style={lableStyle} id="namelable">User Name</label>
                                <input type="text" class="form-control" id="uer_name" style={inputStyle} name='uerName' value={this.state.userName} onChange={this.handleUserName} onFocus={() => this.myfocus('uer_name')} placeholder="User name" title='User name' />
                                <div class="valid-feedback">
                                    Looks good!
                                 </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="col-md-4 offset-md-4 mb-3">
                                <label for="password" style={lableStyle} id="passwordlbl">Password</label>
                                <input type="password" class="form-control" id="_password" style={inputStyle} name='password' value={this.state.handlePassword} onChange={this.handlePassword} onFocus={() => this.myfocus('_password')} placeholder="Password" title='Password' />
                                <span title='Show Password' toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password" onClick={this.showPassword}></span>
                                <div class="valid-feedback">
                                    Looks good!
                                 </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-sm-5"></div>
                            <div className='col-sm-3 ml-5'>
                                <button class="btn" style={{ backgroundColor: '#f43b48', color: 'white', fontWeight: 700 }} onClick={this.handleSubmit}>Sign In</button>
                            </div>
                            <div className="col-sm-4"></div>
                        </div>
                    </form>
                    <div className='row mt-2'>
                        <div className='col-sm-4'></div>
                        <div className='col-sm-4 text-center'>
                            <Link to='/forget-password' title='Forget Password' onClick={this.forgetPassword}>Forget Password</Link>
                        </div>
                        <div className='col-sm-4'></div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-sm-4'></div>
                        <div className='col-sm-4 text-center'>
                            <Link to='/' title='Create Account' onClick={this.signUp}>Create Account</Link>
                        </div>
                        <div className='col-sm-4'></div>
                    </div>
                </div>
                <div id='forget_password' style={{ display: 'none' }}>
                    <form className='mt-5'>
                        <h2 className='text-center'>Forget Password</h2>
                        <div class="form-row">
                            <div class="col-md-4 offset-md-4 mb-3">
                                <label for="fullName" style={lableStyle} id="forgetnamelable">User Name</label>
                                <input type="text" class="form-control" id="forget_uer_name" style={inputStyle} name='uerName' value={this.state.forgetuserName} onChange={this.handleForGetUserName} onFocus={() => this.myfocus('forget_uer_name')} placeholder="User name" title='User name' />
                                <div class="valid-feedback">
                                    Looks good!
                                 </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="col-md-4 offset-md-4 mb-3">
                                <label for="email" style={lableStyle} id="forgetemaillbl">Email</label>
                                <input type="text" class="form-control" id="forget__email" style={inputStyle} name='email' value={this.state.forgetemail} onChange={this.handleForGetEmail} onFocus={() => this.myfocus('forget__email')} placeholder="Email" title='Email' />
                                <div class="valid-feedback">
                                    Looks good!
                                 </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-sm-5"></div>
                            <div className='col-sm-3 ml-5'>
                                <button class="btn" style={{ backgroundColor: '#f43b48', color: 'white', fontWeight: 700 }} onClick={this.handleForGetPassword}>Submit</button>
                            </div>
                            <div className="col-sm-4"></div>
                        </div>
                    </form>
                </div>
                <div id='sign_up' style={{ display: 'none' }}>
                    <NewUser />
                </div>
                <div className="page-wrapper" id="body" style={{ display: 'none' }}>
                    {/* <div className="page-wrapper" id="body"> */}
                    <Header />
                    <div className="page-body-wrapper">
                        <Sidebar id='side_bar' />
                        <div className="page-body">
                            {/* <Link to='/signin'><button >LogOut</button></Link> */}
                            {this.props.children}
                            <Footer />
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
export default App