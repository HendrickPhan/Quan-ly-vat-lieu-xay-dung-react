import { displayMessage } from '../../../components/Snackbar/SnackbarActions.js';

export const FETCH_SELLING_BILL_PRODUCTS_SUCCESS = 'FETCH_SELLING_BILL_PRODUCTS_SUCCESS';
export const FETCH_SELLING_BILL_PRODUCTS_FAILURE = 'FETCH_SELLING_BILL_PRODUCTS_FAILURE';
export const FETCH_SELLING_BILL_CATEGORIES_SUCCESS = 'FETCH_SELLING_BILL_CATEGORIES_SUCCESS';
export const FETCH_SELLING_BILL_CATEGORIES_FAILURE = 'FETCH_SELLING_BILL_CATEGORIES_FAILURE';
export const RESET_FORM = 'RESET_FORM';


var token = "";
if(JSON.parse(localStorage.getItem('user_info'))) {
  token = "Bearer " + JSON.parse(localStorage.getItem('user_info')).token;
}


const fetchProductsSuccess = product => ({
  type: FETCH_SELLING_BILL_PRODUCTS_SUCCESS,
  product
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
      .then(product => {
        dispatch(fetchProductsSuccess(product));
        return product;
      })
      .catch(error =>
        dispatch(fetchProductsFailure(error))
      );
  };
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
