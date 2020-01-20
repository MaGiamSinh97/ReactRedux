import React, {Component} from 'react';
import {Route, Link, Switch, Redirect,BrowserRouter as Router} from 'react-router-dom';
import InvoiceImport from './TradeDetailPage/InvoiceImport';

const menus = [
    {
        name : "Hóa đơn nhập",
        to : "/trade/invoice-import",
        exact: true
    },
    {
        name : "Trả hàng nhập",
        to : "/trade/return-import",
        exact: false
    },
    {
        name : "Hóa đơn xuất",
        to : "/trade/invoice-export",
        exact: false
    },
    {
        name : "Trả hàng xuất",
        to : "/trade/return-export",
        exact: false
    }

];

const routes = [
    {
        path: "/trade/invoice-import",
        exact: true,
        main: () => <InvoiceImport />
    },
    {
        path: '/trade/return-import',
        exact: false,
        main: () => <InvoiceImport />
    },
    {
        path: '/trade/invoice-export',
        exact: false,
        main: () => <InvoiceImport />
    },
    {
        path: '/trade/return-export',
        exact: false,
        main: () => <InvoiceImport />
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

class TradePage extends Component {
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

                <Redirect from={`${match.path}`} to={`${match.url}/invoice-import`} />
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

export default TradePage;
