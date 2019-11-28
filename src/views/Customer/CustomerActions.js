import { displayMessage } from '../../components/Snackbar/SnackbarActions.js';

export const FETCH_CUSTOMERS_BEGIN = 'FETCH_CUSTOMERS_BEGIN';
export const FETCH_CUSTOMERS_SUCCESS = 'FETCH_CUSTOMERS_SUCCESS';
export const FETCH_CUSTOMERS_FAILURE = 'FETCH_CUSTOMERS_FAILURE';
export const CHANGE_PER_PAGE = 'CHANGE_PER_PAGE';
export const DELETE_CUSTOMER = 'DELETE_CUSTOMER';

export const fetchCustomersBegin = () => ({
  type: FETCH_CUSTOMERS_BEGIN
});

export const fetchCustomersSuccess = customers => ({
  type: FETCH_CUSTOMERS_SUCCESS,
  customers
});

export const fetchCustomersFailure = error => ({
  type: FETCH_CUSTOMERS_FAILURE,
  error
});

export const deleteCustomerSuccess = id => ({
  type: DELETE_CUSTOMER,
  id
});

export const fetchCustomers = (page, perPage) => {
  return dispatch => {
    dispatch(fetchCustomersBegin());
    return _getCustomers(page, perPage)
      .then(customers => {
        dispatch(fetchCustomersSuccess(customers));
        return customers;
      })
      .catch(error =>
        dispatch(fetchCustomersFailure(error))
      );
  };
}

export const deleteCustomer = (id) => {
  return dispatch => {
    return _deleteCustomer(id)
      .then(id => {
        dispatch(deleteCustomerSuccess(id))
      })
      .then(()=>{
        dispatch(displayMessage('Xóa thành công', 'success', 3000));
      })
  }
}

export const changePerPage = (perPage) => {
  return dispatch => {
    dispatch(fetchPerPage(perPage)); 
    dispatch(fetchCustomers(1, perPage));
  };
}

const fetchPerPage = (perPage) => ({
  type: CHANGE_PER_PAGE,
  perPage
})

const _deleteCustomer = (id) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTU3MzQ0NzE0NSwiZXhwIjozNjE1NzM0NDcxNDUsIm5iZiI6MTU3MzQ0NzE0NSwianRpIjoiNnNlSHJGSjNHeXp3QzVLVyIsInN1YiI6MSwicHJ2IjoiZjkzMDdlYjVmMjljNzJhOTBkYmFhZWYwZTI2ZjAyNjJlZGU4NmY1NSJ9.IDR5-rQKJ0hRYRo2UNBtQe8AQras7CJzjgadsnzQ4HU'
    },
  };

  return fetch(process.env.REACT_APP_API_URL + `/customer/` + id, requestOptions)
    .then(handleResponse)
    .then(() => {
      return id;
    });
}

const _getCustomers = (page, perPage) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTU3MzQ0NzE0NSwiZXhwIjozNjE1NzM0NDcxNDUsIm5iZiI6MTU3MzQ0NzE0NSwianRpIjoiNnNlSHJGSjNHeXp3QzVLVyIsInN1YiI6MSwicHJ2IjoiZjkzMDdlYjVmMjljNzJhOTBkYmFhZWYwZTI2ZjAyNjJlZGU4NmY1NSJ9.IDR5-rQKJ0hRYRo2UNBtQe8AQras7CJzjgadsnzQ4HU'
    },
  };

  return fetch(process.env.REACT_APP_API_URL + `/customer?page=` + page + '&limit=' + perPage, requestOptions)
    .then(handleResponse)
    .then(customers => {
      console.log("CUSTOMER", customers)
      return customers;
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
