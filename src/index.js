import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware} from 'redux';
import appReducers  from './reducers/Index';
import { Provider } from 'react-redux';
import {getListProduct, getListCategory} from './actions/ProductActions';
import {getListCustomer} from './actions/CustomerAction';
import thunk from 'redux-thunk';

// const store = createStore(
//     appReducers,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

const store = createStore(appReducers, applyMiddleware(thunk));

store.dispatch(getListProduct());

store.dispatch(getListCustomer());

store.dispatch(getListCategory());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);

serviceWorker.unregister();
