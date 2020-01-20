import React, {Component} from 'react';
import {Route, Link, Switch, Redirect,BrowserRouter as Router} from 'react-router-dom';
import ProductDetail from './ProductDetailPage/ProductDetail';
import Warehouse from './Warehouse/Warehouse'

const menus = [
    {
        name : "Sản Phẩm",
        to : "/product/list-product",
        exact: true
    },
    {
        name : "Kho hàng",
        to : "/product/warehouse",
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
                        <Link className="nav-link color-tag-a" to={to}>
                            {label}
                        </Link>
                    </li>
                )
            }}
        />
    )
};

const routes = [
    {
        path: '/product/list-product',
        exact: true,
        main: () => <ProductDetail />
    },
    {
        path: '/product/warehouse',
        exact: false,
        main: () => <Warehouse />
    }
];

class ProductPage extends Component {
    
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

                <Redirect from={`${match.path}`} to={`${match.url}/list-product`} />
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

export default ProductPage;
