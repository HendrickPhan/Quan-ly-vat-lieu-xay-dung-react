import { displayMessage } from '../../components/Snackbar/SnackbarActions.js';

export const FETCH_IMPORT_BILL_PRODUCTS_SUCCESS = 'FETCH_IMPORT_BILL_PRODUCTS_SUCCESS';
export const FETCH_IMPORT_BILL_PRODUCTS_FAILURE = 'FETCH_IMPORT_BILL_PRODUCTS_FAILURE';
export const FETCH_IMPORT_BILL_CATEGORIES_SUCCESS = 'FETCH_IMPORT_BILL_CATEGORIES_SUCCESS';
export const FETCH_IMPORT_BILL_CATEGORIES_FAILURE = 'FETCH_IMPORT_BILL_CATEGORIES_FAILURE';
export const FETCH_IMPORT_BILL_VENDORS_SUCCESS = 'FETCH_IMPORT_BILL_VENDORS_SUCCESS';
export const FETCH_IMPORT_BILL_VENDORS_FAILURE = 'FETCH_IMPORT_BILL_VENDORS_FAILURE';
export const ADD_IMPORT_BILL_SUCCESS = 'ADD_IMPORT_BILL_SUCCESS';
export const ADD_IMPORT_BILL_FAILURE = 'ADD_IMPORT_BILL_FAILURE';
export const RESET_FORM = 'RESET_FORM';


var token = "";
if(JSON.parse(localStorage.getItem('user_info'))) {
  token = "Bearer " + JSON.parse(localStorage.getItem('user_info')).token;
}
const fetchProductsSuccess = products => ({
  type: FETCH_IMPORT_BILL_PRODUCTS_SUCCESS,
  products
});

const fetchProductsFailure = error => ({
  type: FETCH_IMPORT_BILL_PRODUCTS_FAILURE,
  error
});

const fetchCategoriesSuccess = categories => ({
  type: FETCH_IMPORT_BILL_CATEGORIES_SUCCESS,
  categories
});

const fetchCategoriesFailure = error => ({
  type: FETCH_IMPORT_BILL_CATEGORIES_FAILURE,
  error
});

const fetchVendorsSuccess = vendors => ({
  type: FETCH_IMPORT_BILL_VENDORS_SUCCESS,
  vendors
});

const fetchVendorsFailure = error => ({
  type: FETCH_IMPORT_BILL_VENDORS_FAILURE,
  error
});

export const addImportBillSuccess = importBill => ({
  type: ADD_IMPORT_BILL_SUCCESS,
  importBill
});

export const addImportBillFailure = error => ({
  type: ADD_IMPORT_BILL_FAILURE,
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

export const addImportBill = (data) => {
  return dispatch => {
    return _addImportBill(data)
      .then(importBill => {
        dispatch(addImportBillSuccess(importBill));
        return importBill;
      })
      .then((importBill)=>{
        dispatch(displayMessage('Thêm thành công', 'success', 3000));
        return importBill;
      })
      .catch(error =>
        dispatch(addImportBillFailure(error))
      );
    }
};

const _addImportBill = (data) => {
  console.log('data', data);
  let formData = new FormData();
  formData.append("total_paid", data.total_paid);
  formData.append("vendor_id", data.vendor_id);
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

  return fetch(process.env.REACT_APP_API_URL + `/import-goods-bill`, requestOptions)
    .then(handleResponse)
    .then(importBill => {
      console.log('selling response', importBill);
      return importBill;
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

export const fetchVendors = () => {
  return dispatch => {
    return _getVendors()
      .then(vendors => {
        dispatch(fetchVendorsSuccess(vendors));
        return vendors;
      })
      .catch(error =>
        dispatch(fetchVendorsFailure(error))
      );
  };
}

const _getVendors = () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
  };

  return fetch(process.env.REACT_APP_API_URL + `/vendor/select-list`, requestOptions)
    .then(handleResponse)
    .then(vendors => {
      return vendors;
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
