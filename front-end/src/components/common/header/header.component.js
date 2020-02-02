import React, { Component } from 'react';
import UserMenu from './user-menu.component';
import './header.css';
class Header extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            sidebar: true,
            navMenus: false
        }
    }

    openCloseSidebar = () => {
        if (this.state.sidebar) {
            this.setState({ sidebar: false })
            document.querySelector(".page-body-wrapper").classList.add('sidebar-close');
        } else {
            this.setState({ sidebar: true })
            document.querySelector(".page-body-wrapper").classList.remove('sidebar-close');
        }
    }

    toggle() {
        this.setState(prevState => ({
            navMenus: !prevState.navMenus
        }));
    }

    componentWillMount() {
        var contentwidth = window.innerWidth;
        if ((contentwidth) <= 991) {
            this.setState({ sidebar: false })
        }
    }

    componentDidMount() {
        var contentwidth = window.innerWidth;
        if ((contentwidth) <= 991) {
            document.querySelector(".page-body-wrapper").classList.add('sidebar-close');
        }
    }

    render() {
        const myStyle = {
            background: "linear-gradient(to right, #f43b48 0%, #453a94 100%)",
            color: "white"
        }
        return (
            <div className="page-main-header" id="react-no-print" style={myStyle}>
                <div className="main-header-right row">
                        <img src={require('../../../assets/images/logo.png')} alt="" style={{width: '100px', height:'100px'}} />
                    <div className="mobile-sidebar">
                        <div className="media-body text-right txt-white switch-sm ml-5">
                            <label className="switch">
                                <input type="checkbox" id="sidebar-toggle" defaultChecked={this.state.sidebar} onClick={this.openCloseSidebar} />
                                <span className="switch-state"></span>
                            </label>
                        </div>
                    </div>
                    <div className="nav-right col">
                        <ul className={"nav-menus " + (this.state.navMenus ? 'open' : '')} >
                            <UserMenu />
                        </ul>
                        <div className="d-lg-none mobile-toggle" onClick={() => this.toggle()}>
                            <i className="icon-more"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Header