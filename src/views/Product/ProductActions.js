import { displayMessage } from '../../components/Snackbar/SnackbarActions.js';

export const FETCH_PRODUCTS_BEGIN = 'FETCH_PRODUCTS_BEGIN';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const CHANGE_PER_PAGE = 'CHANGE_PER_PAGE';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

var token = "";
if(JSON.parse(localStorage.getItem('user_info'))) {
  token = "Bearer " + JSON.parse(localStorage.getItem('user_info')).token;
}
export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN
});

export const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  products
});

export const fetchProductsFailure = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { error }
});

export const deleteProductSuccess = id => ({
  type: DELETE_PRODUCT,
  id
});

export const fetchProducts = (page, perPage) => {
  return dispatch => {
    dispatch(fetchProductsBegin());
    return _getProducts(page, perPage)
      .then(products => {
        dispatch(fetchProductsSuccess(products));
        return products;
      })
      .catch(error =>
        dispatch(fetchProductsFailure(error))
      );
  };
}

export const deleteProduct = (id) => {
  return dispatch => {
    return _deleteProduct(id)
      .then(id => {
        dispatch(deleteProductSuccess(id))
      })
      .then(()=>{
        dispatch(displayMessage('Xóa thành công', 'success', 3000));
      })
  }
}

export const changePerPage = (perPage) => {
  return dispatch => {
    dispatch(fetchPerPage(perPage)); 
    dispatch(fetchProducts(1, perPage));
  };
}

const fetchPerPage = (perPage) => ({
  type: CHANGE_PER_PAGE,
  perPage
})

const _deleteProduct = (id) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
  };

  return fetch(process.env.REACT_APP_API_URL + `/product/` + id, requestOptions)
    .then(handleResponse)
    .then(() => {
      return id;
    });
}

const _getProducts = (page, perPage) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
  };

  return fetch(process.env.REACT_APP_API_URL + `/product?page=` + page + '&limit=' + perPage, requestOptions)
    .then(handleResponse)
    .then(products => {
      return products;
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
