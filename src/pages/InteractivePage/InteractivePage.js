import React, {Component} from 'react';
import {Route, Link, Switch, Redirect,BrowserRouter as Router} from 'react-router-dom';
import Supplier from './InteractivePageDetail/Supplier';
import Customer from './InteractivePageDetail/Customer/CustomerDetail';

const menus = [
    {
        name : "Nhà cung cấp",
        to : "/interactive/supplier",
        exact: true
    },
    {
        name : "Khách hàng",
        to : "/interactive/customer",
        exact: false
    }
];

const routes = [
    {
        path: '/interactive/supplier',
        exact: true,
        main: () => <Supplier />
    },
    {
        path: '/interactive/customer',
        exact: false,
        main: () => <Customer />
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
                        <Link className="nav-link color-tag-a" to={to}>
                            {label}
                        </Link>
                    </li>
                )
            }}
        />
    )
};

class InteractivePage extends Component {
    render(){
        const match = this.props.match;
        return ( 
            <Router>
                <nav className="navbar navbar-expand-sm navbar-light bg-light menu-child">
                    <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse menu-center" id="collapsibleNavId">
                        <ul className="navbar-nav mx-auto mt-2 mt-lg-0">
                            {this.showMenus(menus)}
                        </ul>
                    </div>                   
                </nav>

                {this.showContentMenus(routes)};

                <Redirect from={`${match.path}`} to={`${match.url}/supplier`} />
            </Router>         
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

    showContentMenus = (routes) => {
        var result = null;
        if(routes.length > 0) {
            result = routes.map((route,index) => {
                return (
                        <Route 
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            component={route.main}
                        />
                )
            })
            return <Switch>{result}</Switch>;
        }
    }
}

export default InteractivePage;
