import {combineReducers} from 'redux';
import products from './ProductReducer';
import customers from './CustomerReducer'

const appReducers = combineReducers({
    products: products,
    customers: customers,
});

export default appReducers;