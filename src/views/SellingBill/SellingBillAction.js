import { displayMessage } from '../../components/Snackbar/SnackbarActions.js';

export const FETCH_SELLING_BILL_PRODUCTS_SUCCESS = 'FETCH_SELLING_BILL_PRODUCTS_SUCCESS';
export const FETCH_SELLING_BILL_PRODUCTS_FAILURE = 'FETCH_SELLING_BILL_PRODUCTS_FAILURE';
export const FETCH_SELLING_BILL_CATEGORIES_SUCCESS = 'FETCH_SELLING_BILL_CATEGORIES_SUCCESS';
export const FETCH_SELLING_BILL_CATEGORIES_FAILURE = 'FETCH_SELLING_BILL_CATEGORIES_FAILURE';
export const FETCH_SELLING_BILL_CUSTOMERS_BEGIN = 'FETCH_SELLING_BILL_CUSTOMER_BEGIN';
export const FETCH_SELLING_BILL_CUSTOMERS_SUCCESS = 'FETCH_SELLING_BILL_CUSTOMERS_SUCCESS';
export const FETCH_SELLING_BILL_CUSTOMERS_FAILURE = 'FETCH_SELLING_BILL_CUSTOMER_FAILURE';
export const ADD_SELLING_BILL_SUCCESS = 'ADD_SELLING_BILL_SUCCESS';
export const ADD_SELLING_BILL_FAILURE = 'ADD_SELLING_BILL_FAILURE';
export const RESET_FORM = 'RESET_FORM';


var token = "";
if(JSON.parse(localStorage.getItem('user_info'))) {
  token = "Bearer " + JSON.parse(localStorage.getItem('user_info')).token;
}
const fetchProductsSuccess = products => ({
  type: FETCH_SELLING_BILL_PRODUCTS_SUCCESS,
  products
});

const fetchProductsFailure = error => ({
  type: FETCH_SELLING_BILL_PRODUCTS_FAILURE,
  error
});

const fetchCategoriesSuccess = categories => ({
  type: FETCH_SELLING_BILL_CATEGORIES_SUCCESS,
  categories
});

const fetchCategoriesFailure = error => ({
  type: FETCH_SELLING_BILL_CATEGORIES_FAILURE,
  error
});

export const fetchCustomersBegin = () => ({
  type: FETCH_SELLING_BILL_CUSTOMERS_BEGIN
});

export const fetchCustomersSuccess = customers => ({
  type: FETCH_SELLING_BILL_CUSTOMERS_SUCCESS,
  customers
});

export const fetchCustomersFailure = error => ({
  type: FETCH_SELLING_BILL_CUSTOMERS_FAILURE,
  error
});

export const addSellingBillSuccess = sellingBill => ({
  type: ADD_SELLING_BILL_SUCCESS,
  sellingBill
});

export const addSellingBillFailure = error => ({
  type: ADD_SELLING_BILL_FAILURE,
  payload: { error }
});


export const resetForm = () => ({
  type: RESET_FORM
});

export const reset = () => {
  return dispatch => {
    dispatch(resetForm());
  }
}

export const fetchProducts = (page, perPage, keyword=null, category=null) => {
  return dispatch => {
    return _getProducts(page, perPage, keyword, category)
      .then(products => {
        dispatch(fetchProductsSuccess(products));
        return products;
      })
      .catch(error =>
        dispatch(fetchProductsFailure(error))
      );
  };
}

export const addSellingBill = (data) => {
  return dispatch => {
    return _addSellingBill(data)
      .then(sellingBill => {
        dispatch(addSellingBillSuccess(sellingBill));
        return sellingBill;
      })
      .then((sellingBill)=>{
        dispatch(displayMessage('Thêm thành công', 'success', 3000));
        return sellingBill;
      })
      .catch(error =>
        dispatch(addSellingBillFailure(error))
      );
    }
};

const _addSellingBill = (data) => {
  console.log('data', data);
  let formData = new FormData();
  formData.append("total_paid", data.total_paid);
  formData.append("customer_id", data.customer_id);
  data.details.map((v, i) => {
    formData.append(`details[${i}][product_id]`, v.product_id);
    formData.append(`details[${i}][quantity]`, v.quantity);
  });
  const requestOptions = {
    method: 'POST',
    headers: {
      'Authorization': token
    },
    body: formData
  };

  return fetch(process.env.REACT_APP_API_URL + `/selling-bill`, requestOptions)
    .then(handleResponse)
    .then(sellingBill => {
      console.log('selling response', sellingBill);
      return sellingBill;
    });
}



const _getProducts = (page, perPage, keyword, category) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
  };

  let fetchUrl = process.env.REACT_APP_API_URL + `/product?page=` + page + '&limit=' + perPage;
  if(keyword) {
    fetchUrl += '&keyword=' + keyword;
  }
  if(category) {
    fetchUrl += '&category=' + category;
  }

  return fetch(fetchUrl, requestOptions)
    .then(handleResponse)
    .then(products => {
      return products;
    });
}

export const fetchCategories = () => {
  return dispatch => {
    return _getCategories()
      .then(categories => {
        dispatch(fetchCategoriesSuccess(categories));
        return categories;
      })
      .catch(error =>
        dispatch(fetchCategoriesFailure(error))
      );
  };
}

const _getCategories = () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
  };

  return fetch(process.env.REACT_APP_API_URL + `/category/select-list`, requestOptions)
    .then(handleResponse)
    .then(categorySelectList => {
      return categorySelectList;
    });
}

export const fetchCustomers = () => {
  return dispatch => {
    return _getCustomers()
      .then(customers => {
        dispatch(fetchCustomersSuccess(customers));
        return customers;
      })
      .catch(error =>
        dispatch(fetchCustomersFailure(error))
      );
  };
}

const _getCustomers = () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
  };

  return fetch(process.env.REACT_APP_API_URL + `/customer/select-list`, requestOptions)
    .then(handleResponse)
    .then(customerSelectList => {
      return customerSelectList;
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
