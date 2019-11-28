import { displayMessage } from '../../../components/Snackbar/SnackbarActions.js';

export const FETCH_CUSTOMER_BEGIN = 'FETCH_CUSTOMER_BEGIN';
export const FETCH_CUSTOMER_SUCCESS = 'FETCH_CUSTOMER_SUCCESS';
export const FETCH_CUSTOMER_FAILURE = 'FETCH_CUSTOMER_FAILURE';
export const EDIT_CUSTOMER_SUCCESS = 'EDIT_CUSTOMER_SUCCESS';
export const EDIT_CUSTOMER_FAILURE = 'EDIT_CUSTOMER_FAILURE';
export const ADD_CUSTOMER_SUCCESS = 'ADD_CUSTOMER_SUCCESS';
export const ADD_CUSTOMER_FAILURE = 'ADD_CUSTOMER_FAILURE';
export const RESET_FORM = 'RESET_FORM';


export const fetchCustomerBegin = () => ({
  type: FETCH_CUSTOMER_BEGIN
});

export const fetchCustomerSuccess = customer => ({
  type: FETCH_CUSTOMER_SUCCESS,
  customer
});

export const fetchCustomerFailure = error => ({
  type: FETCH_CUSTOMER_FAILURE,
  error
});

export const editCustomerSuccess = customer => ({
  type: EDIT_CUSTOMER_SUCCESS,
  customer
});

export const editCustomerFailure = error => ({
  type: EDIT_CUSTOMER_FAILURE,
  error
});

export const addCustomerSuccess = customer => ({
  type: ADD_CUSTOMER_SUCCESS,
  customer
});

export const addCustomerFailure = error => ({
  type: ADD_CUSTOMER_FAILURE,
  error
});

export const resetForm = () => ({
  type: RESET_FORM
});

export const reset = () => {
  return dispatch => {
    dispatch(resetForm());
  }
}

export const fetchCustomer = (id) => {
  return dispatch => {
    dispatch(fetchCustomerBegin());
    return _getCustomer(id)
      .then(customer => {
        dispatch(fetchCustomerSuccess(customer));
        return customer;
      })
      .catch(error =>
        dispatch(fetchCustomerFailure(error))
      );
  };
}

export const editCustomer = (id, data) => {
  return dispatch => {
    dispatch(fetchCustomerBegin());
    return _editCustomer(id, data)
      .then(customer => {
        dispatch(editCustomerSuccess(customer));
        return customer;
      })
      .then(customer => {
        dispatch(fetchCustomer(customer.id));
      })
      .then(()=>{
        dispatch(displayMessage('Cập nhập thành công', 'success', 3000));
      })
      .catch(error =>
        dispatch(editCustomerFailure(error))
      );
  };
}

export const addCustomer = (data) => {
  return dispatch => {
    dispatch(fetchCustomerBegin());
    return _addCustomer(data)
      .then(customer => {
        dispatch(addCustomerSuccess(customer));
        return customer;
      })
      .then((customer)=>{
        dispatch(displayMessage('Thêm thành công', 'success', 3000));
        return customer;
      })
      .catch(error =>{
        dispatch(addCustomerFailure(error))
      });
  };
}

const _getCustomer = (id) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTU3MzQ0NzE0NSwiZXhwIjozNjE1NzM0NDcxNDUsIm5iZiI6MTU3MzQ0NzE0NSwianRpIjoiNnNlSHJGSjNHeXp3QzVLVyIsInN1YiI6MSwicHJ2IjoiZjkzMDdlYjVmMjljNzJhOTBkYmFhZWYwZTI2ZjAyNjJlZGU4NmY1NSJ9.IDR5-rQKJ0hRYRo2UNBtQe8AQras7CJzjgadsnzQ4HU'
    },
  };
  return fetch(process.env.REACT_APP_API_URL + `/customer/` + id, requestOptions)
    .then(handleResponse)
    .then(customer => {
      return customer;
    });
}

const _editCustomer = (id, data) => {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTU3MzQ0NzE0NSwiZXhwIjozNjE1NzM0NDcxNDUsIm5iZiI6MTU3MzQ0NzE0NSwianRpIjoiNnNlSHJGSjNHeXp3QzVLVyIsInN1YiI6MSwicHJ2IjoiZjkzMDdlYjVmMjljNzJhOTBkYmFhZWYwZTI2ZjAyNjJlZGU4NmY1NSJ9.IDR5-rQKJ0hRYRo2UNBtQe8AQras7CJzjgadsnzQ4HU'
    },
    body: JSON.stringify(data)
  };

  return fetch(process.env.REACT_APP_API_URL + `/customer/` + id, requestOptions)
    .then(handleResponse)
    .then(customer => {
      return customer;
    });
}

const _addCustomer= (data) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTU3MzQ0NzE0NSwiZXhwIjozNjE1NzM0NDcxNDUsIm5iZiI6MTU3MzQ0NzE0NSwianRpIjoiNnNlSHJGSjNHeXp3QzVLVyIsInN1YiI6MSwicHJ2IjoiZjkzMDdlYjVmMjljNzJhOTBkYmFhZWYwZTI2ZjAyNjJlZGU4NmY1NSJ9.IDR5-rQKJ0hRYRo2UNBtQe8AQras7CJzjgadsnzQ4HU'
    },
    body: JSON.stringify(data)
  };

  return fetch(process.env.REACT_APP_API_URL + `/customer`, requestOptions)
    .then(handleResponse)
    .then(customer => {
      return customer;
    });
}

const handleResponse = (response) => {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  })
}
