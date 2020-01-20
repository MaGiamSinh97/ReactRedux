import React from 'react';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ProductPage from './pages/ProductPage/ProductPage';
import TradePage from './pages/TradePage/TradePage';
import ReportPage from './pages/ReportPage/ReportPage';
import InteractivePage from './pages/InteractivePage/InteractivePage';

const routes = [
    {
        path: '/',
        exact: true,
        main: () => <HomePage />
    },
    {
        path: '/product',
        exact: false,
        main: ({match}) => <ProductPage match = {match}/>
    },
    {
        path: '/interactive',
        exact: false,
        main: ({match}) => <InteractivePage match= {match}/>
    },
    {
        path: '/trade',
        exact: false,
        main: ({match}) => <TradePage match={match}/>
    },
    {
        path: '/report',
        exact: false,
        main: () => <ReportPage />
    },
    {
        path: '',
        exact: false,
        main: () => <NotFoundPage />
    }
];

export default routes;
