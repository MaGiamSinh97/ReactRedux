import {GET_CUSTOMERS, ADD_CUSTOMER, UPDATE_CUSTOMER, DELETE_CUSTOMER} from './../constants/ActionTypes';
import callApi from './../utils/ApiCaller';
import {toast} from 'react-toastify';

export const creatCustomer = ({name, age, address}) => {
    return async (dispatch) => {
        try {
            const res = await callApi('products', 'POST', { name, age, address });
            dispatch(createCustomerSuccess(res.data));
            toast.success("Thêm mới thành công");
        }
        catch (err) {
            toast.error("Thêm mới thất bại");
        }
    }
}

export const createCustomerSuccess =  (data) => {  
    return {
      type: ADD_CUSTOMER,
      payload: {
        id: data.id,
        name: data.name,
        age: data.age,
        address: data.address,
      }
    }
  };

export const updateCustomer = ({id, name, age, address}) => {
    return async (dispatch) => {
        try {
            const res = await callApi(`products/${id}`, 'PUT', {name, age, address});
            dispatch(updateCustomerSuccess(res.data));
            toast.success("Sửa thành công");
        }
        catch (e) {
            toast.error("Sửa thất bại");
        }
    }
}

export const updateCustomerSuccess = (data) => {
    return {
        type: UPDATE_CUSTOMER,
        payload: {
            id: data.id,
            name: data.name,
            age: data.age,
            address: data.address,
        }
    }
};

export const deleteCustomerSuccess = id => {
    return {
      type: DELETE_CUSTOMER,
      payload: {
          id
        }
    }
  }
  
export const deleteCustomer = (id) => {
    return async (dispatch) => {
        try {
            await callApi(`products/${id}`, 'DELETE', null);
            dispatch(deleteCustomerSuccess(id));
            toast.success("Xóa thành công");
        }
        catch (err) {
            toast.error("Xóa thất bại");
        }
    }
};

export const fetchCustomers = (customers) => {
    return {
        type: GET_CUSTOMERS,
        customers
    }
}

export const getListCustomer = () => {
    return async (dispatch) => {
        try {
            const res = await callApi('product', 'GET', null);
            dispatch(fetchCustomers(res.data));
        }
        catch (err) {
            throw (err);
        }
    }
}