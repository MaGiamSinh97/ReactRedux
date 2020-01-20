import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';

const menus = [
    {
        name : "Trang chủ",
        to : "/",
        exact: true
    },
    {
        name : "Hàng hóa",
        to : "/product",
        exact: false
    },
    {
        name : "Giao dịch",
        to : "/trade",
        exact: false
    },
    {
        name : "Đối tác",
        to : "/interactive",
        exact: false
    },
    {
        name : "Báo cáo",
        to : "/report",
        exact: false
    }
];

const MenuLink = ({label, to, activeOnlyWhenExact}) => {
    return (
        <Route 
            path={to}
            exact={activeOnlyWhenExact}
            children={({match}) => {
                var active = match ? 'active' : '';
                return (
                    <li className={`${active} nav-item`}>
                        <Link className="nav-link" to={to}>
                            {label}
                        </Link>
                    </li>
                )
            }}
        />
    )
}

class Menu extends Component {
    render(){
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-light bg-light menu-parent">
                    <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavId">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            {this.showMenus(menus)}
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
    showMenus = (menus) => { 
        if(menus.length > 0) {
            return (
                menus.map((menu, index) => {
                    return (
                        <MenuLink
                            key={index} 
                            label={menu.name}
                            to={menu.to}
                            activeOnlyWhenExact={menu.exact}
                        />
                    )
                })
            )
        }
    }
}


export default Menu;
