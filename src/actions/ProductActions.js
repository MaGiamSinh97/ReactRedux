import {ADD_PRODUCT, DELETE_PRODUCT, GET_PRODUCTS, UPDATE_PRODUCT, GET_CATEGORY} from './../constants/ActionTypes';
import callApi from './../utils/ApiCaller';
import {toast} from 'react-toastify';

export const creatProduct = ({productName, priceCost, price, status,productTypeId,unitId}) => {
    return async (dispatch) => {
        try {
            const res = await callApi('product', 'POST', { productName, priceCost, price, status, productTypeId, unitId});
            dispatch(createProductSuccess(res.data));
            console.log(res.data)
            toast.success("Thêm mới thành công");
        }
        catch (err) {
            toast.error("Thêm mới thất bại");
        }
    }
}

export const createProductSuccess =  (data) => {  
    console.log(data);
    return {       
        
        type: ADD_PRODUCT,
        payload: {
        productId:data.productId,
        productName: data.productName,
        priceCost: data.priceCost,
        price: data.price,               
        status: data.status,
        productTypeId:data.productTypeId,
        unitId: data.unitId
      }
    }
  };

export const updateProduct = ({productId,productName, priceCost, price, status,productTypeId,unitId}) => {
    return async (dispatch) => {
        try {
            const res = await callApi(`product`, 'PUT', {productId,productName, priceCost, price, status,productTypeId,unitId});
            dispatch(updateProductSuccess(res.data));
            toast.success("Sửa thành công");
        }
        catch (e) {
            toast.error("Sửa thất bại");
        }
    }
}

export const updateProductSuccess = (data) => {
    console.log(data);
    return {       
        type: UPDATE_PRODUCT,
        payload: {
            productId:data.productId,
            productName: data.productName,
            priceCost: data.priceCost,
            price: data.price,               
            status: data.status,
            productTypeId:data.productTypeId,
            unitId: data.unitId
        }
    }
};

export const deleteProductSuccess = id => {
    return {
      type: DELETE_PRODUCT,
      payload: {
            id
        }
    }
  }
  
export const deleteProduct = (id) => {
    return async (dispatch) => {
        try {
            await callApi(`product?productId=${id}`, 'DELETE', null);
            dispatch(deleteProductSuccess(id));
            toast.success("Xóa thành công");
        }
        catch (err) {
            toast.error("Xóa thất bại");
        }
    }
};

export const fetchProducts = (products) => {
    return {
        type: GET_PRODUCTS,
        products
    }
}
export const fetchCategory = (categories) => {
    return {
        type: GET_CATEGORY,
        categories
    }
}

export const getListProduct = () => {
    return async (dispatch) => {
        try {
            const res = await callApi('product', 'GET', null);
            dispatch(fetchProducts(res.data));           
        }
        catch (err) {
            throw (err);
        }
    }
}


export const getListCategory = () => {
    return async (dispatch) => {
        try {
            const res = await callApi('productType', 'GET', null);
            dispatch(fetchCategory(res.data));            
        }
        catch (err) {
            throw (err);
        }
    }
}

