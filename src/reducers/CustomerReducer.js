import {GET_CUSTOMERS, ADD_CUSTOMER, UPDATE_CUSTOMER, DELETE_CUSTOMER} from './../constants/ActionTypes';

export default function productReducer(state = [], action){
    switch(action.type) {
        case ADD_CUSTOMER:
            return [...state, action.payload];
        case UPDATE_CUSTOMER:
            const indexOfElementToUpdate = state.findIndex(customer => customer.id === action.payload.id);
            state[indexOfElementToUpdate] = action.payload;
            return [...state];
        case DELETE_CUSTOMER:
            return state.filter(customer => customer.id !== action.payload.id);
        case GET_CUSTOMERS:
            return action.customers;
        default:
            return state;
    }
}
