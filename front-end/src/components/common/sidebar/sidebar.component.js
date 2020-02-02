import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {MENUITEMS} from '../../../constants/menu'
import './sidebar.css';
class Sidebar extends Component {

    state = { selectedPath: "1", mainmenu:[] };
    onItemSelection = (arg, e)=> {
        this.setState({ selectedPath: arg.path });
    };

    componentWillMount() {
        this.setState({
            mainmenu:MENUITEMS
        })
    }
    componentDidMount() {
        var currentUrl = window.location.pathname;

        this.state.mainmenu.filter(items => {
            if (!items.children){ 
                if (items.path === currentUrl)
                    this.setNavActive(items)
                return false 
            }
            items.children.filter(subItems => {
                if (subItems.path === currentUrl)
                    this.setNavActive(subItems)
                if (!subItems.children) return false
                subItems.children.filter(subSubItems => {
                    if (subSubItems.path === currentUrl)
                        this.setNavActive(subSubItems)
                })
            })
        })
    }

    setNavActive(item) {
        
        MENUITEMS.filter(menuItem => {
            if(menuItem != item)
                menuItem.active = false
            if(menuItem.children && menuItem.children.includes(item))
                menuItem.active = true
            if(menuItem.children){
                menuItem.children.filter(submenuItems => {
                    if(submenuItems.children && submenuItems.children.includes(item))
                        menuItem.active = true
                    if(submenuItems != item)
                        submenuItems.active = false
                })
            }
        })
        item.active = !item.active

        this.setState({
            mainmenu:MENUITEMS
        })


    }

    render() {
        const mainmenu = this.state.mainmenu.map((menuItem, i) =>
            <li className={`${menuItem.active?'active':''}`} key={i}>
                { (menuItem.sidebartitle)?
                    <div className="sidebar-title pr-5">{menuItem.sidebartitle}</div>
                    :''}
                { (menuItem.type === 'sub' )?
                <a className="sidebar-header " href="javascript:void(0)" onClick={() => this.setNavActive(menuItem)}>
                    <i className={`icon-${menuItem.icon}`}></i>
                    <span className='text-white'>{menuItem.title}</span>
                    <i className="fa fa-angle-right pull-right text-white"></i>
                </a>
                    :''}
                { (menuItem.type === 'link' )?
                    <Link 
                        to={`${process.env.PUBLIC_URL}${menuItem.path}`} 
                        className={`sidebar-header ${menuItem.active?'Active':''}text-white`} 
                        onClick={() => this.setNavActive(menuItem)}
                        >
                        <i className={`icon-${menuItem.icon}`}></i><span className='text-white'>{menuItem.title}</span>
                        {menuItem.children?
                        <i className="fa fa-angle-right pull-right text-white"></i>:''}
                    </Link>
                    :''}
                {menuItem.children?
                <ul 
                className={`sidebar-submenu ${menuItem.active?'menu-open':''}text-white`} 
                style={ menuItem.active?{ opacity: 1, transition: 'opacity 500ms ease-in', color:'white' }: {}}
                >
                    {menuItem.children.map((childrenItem, index) =>
                        <li key={index} className={childrenItem.children?childrenItem.active?'active':'':''} className='text-white'>
                            { (childrenItem.type === 'sub' )?
                            <a href="javascript:void(0)" onClick={() => this.setNavActive(childrenItem)} className='text-white'>
                                <i className="fa fa-angle-right text-white"></i>{childrenItem.title}</a>
                                :''}

                            { (childrenItem.type === 'link' )?
                                <Link
                                    to={`${process.env.PUBLIC_URL}${childrenItem.path}`}
                                    className={childrenItem.active?'active':''}
                                    onClick={() => this.setNavActive(childrenItem)} className='text-white'
                                >
                                    <i className="fa fa-angle-right text-white"></i>{childrenItem.title} </Link>
                                :''}
                            {childrenItem.children?
                                <ul className={`sidebar-submenu ${childrenItem.active?'menu-open':''}text-white`}>
                                    {childrenItem.children.map((childrenSubItem, key) =>
                                        <li className={childrenSubItem.active?'active':'', 'text-white'} key={key}>
                                            { (childrenSubItem.type === 'link' )?
                                                <Link
                                                    to={`${process.env.PUBLIC_URL}${childrenSubItem.path}`}
                                                    className={childrenSubItem.active?'active':''}
                                                >
                                                    <i className="fa fa-angle-right text-white"></i>{childrenSubItem.title}</Link>
                                            :''}
                                        </li>
                                        )}
                                </ul>
                                :''}
                        </li>
                    )}
                </ul>
                    :''}
            </li>
        )

        return (
            <div className="page-sidebar custom-scrollbar page-sidebar-open"  id="react-no-print" style={{backgroundColor:'#343a40'}}>
                {/* <UserPanel /> */}
                <ul className="sidebar-menu">
                    {mainmenu}
                </ul>
                <div className="sidebar-widget text-center">
                    <div className="sidebar-widget-top">
                        <h6 className="mb-2 fs-14">Need Help</h6>
                        <i className="icon-bell"></i>
                    </div>
                    <div className="sidebar-widget-bottom p-20 m-20">
                        <p>+92 300 0000000 Info@wampdo.com<a href="#">Visit FAQ</a></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar
