import {ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT, GET_PRODUCTS, GET_CATEGORY} from './../constants/ActionTypes'

export default function productReducer(state = [], action){
    switch(action.type) {
        case ADD_PRODUCT:
            return [...state, action.payload];
        case UPDATE_PRODUCT:
            const indexOfElementToUpdate = state.findIndex(product => product.id === action.payload.id);
            state[indexOfElementToUpdate] = action.payload;
            return [...state];
        case DELETE_PRODUCT:
            return state.filter(product => product.productId !== action.payload.id);
        case GET_PRODUCTS:
            return action.products;
        //case GET_CATEGORY:
            //return action.categories;    
        default:
            return state;
    }
}
