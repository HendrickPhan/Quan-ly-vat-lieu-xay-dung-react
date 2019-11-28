import { displayMessage } from '../../../components/Snackbar/SnackbarActions.js';

export const FETCH_PRODUCT_BEGIN = 'FETCH_PRODUCT_BEGIN';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';
export const FETCH_PRODUCT_SELECT_LIST_SUCCESS = 'FETCH_PRODUCT_SELECT_LIST_SUCCESS';
export const FETCH_PRODUCT_SELECT_LIST_FAILURE = 'FETCH_PRODUCT_SELECT_LIST_FAILURE';
export const EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS';
export const EDIT_PRODUCT_FAILURE = 'EDIT_PRODUCT_FAILURE';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';
export const RESET_FORM = 'RESET_FORM';


export const fetchProductBegin = () => ({
  type: FETCH_PRODUCT_BEGIN
});

export const fetchProductSuccess = product => ({
  type: FETCH_PRODUCT_SUCCESS,
  product
});

export const fetchProductFailure = error => ({
  type: FETCH_PRODUCT_FAILURE,
  error
});

export const fetchCategorySelectListSuccess = productSelectList => ({
  type: FETCH_PRODUCT_SELECT_LIST_SUCCESS,
  productSelectList
});

export const fetchProductSelectListFailure = error => ({
  type: FETCH_PRODUCT_SELECT_LIST_FAILURE,
  error
});

export const editProductSuccess = product => ({
  type: EDIT_PRODUCT_SUCCESS,
  product
});

export const editProductFailure = error => ({
  type: EDIT_PRODUCT_FAILURE,
  payload: { error }
});

export const addProductSuccess = product => ({
  type: ADD_PRODUCT_SUCCESS,
  product
});

export const addProductFailure = error => ({
  type: ADD_PRODUCT_FAILURE,
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

export const fetchProduct = (id) => {
  return dispatch => {
    dispatch(fetchProductBegin());
    return _getProduct(id)
      .then(product => {
        dispatch(fetchProductSuccess(product));
        return product;
      })
      .catch(error =>
        dispatch(fetchProductFailure(error))
      );
  };
}

export const editProduct = (id, data) => {
  return dispatch => {
    dispatch(fetchProductBegin());
    return _editProduct(id, data)
      .then(product => {
        dispatch(editProductSuccess(product));
        return product;
      })
      .then(product => {
        dispatch(fetchProduct(product.id));
      })
      .then(()=>{
        dispatch(displayMessage('Cập nhập thành công', 'success', 3000));
      })
      .catch(error =>
        dispatch(editProductFailure(error))
      );
  };
}

export const addProduct = (data) => {
  return dispatch => {
    dispatch(fetchProductBegin());
    return _addProduct(data)
      .then(product => {
        dispatch(addProductSuccess(product));
        return product;
      })
      .then((product)=>{
        dispatch(displayMessage('Thêm thành công', 'success', 3000));
        return product;
      })
      .catch(error =>
        dispatch(addProductFailure(error))
      );
  };
}

const _getProduct = (id) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTU3MzQ0NzE0NSwiZXhwIjozNjE1NzM0NDcxNDUsIm5iZiI6MTU3MzQ0NzE0NSwianRpIjoiNnNlSHJGSjNHeXp3QzVLVyIsInN1YiI6MSwicHJ2IjoiZjkzMDdlYjVmMjljNzJhOTBkYmFhZWYwZTI2ZjAyNjJlZGU4NmY1NSJ9.IDR5-rQKJ0hRYRo2UNBtQe8AQras7CJzjgadsnzQ4HU'
    },
  };

  return fetch(process.env.REACT_APP_API_URL + `/product/` + id, requestOptions)
    .then(handleResponse)
    .then(product => {
      let formatedProduct = product;
      formatedProduct.fetchedImages = product.images; 
      formatedProduct.images = [];
      return formatedProduct;
    });
}

const _editProduct = (id, data) => {
  let formData = new FormData();
  formData.append("_method", "PUT");
  formData.append("name", data.name);
  formData.append("price", data.price);
  formData.append("unit", data.unit);
  
  data.categories.map(category => {
    formData.append("categories[]", category);
  })

  data.deleteImages.map(deleteImage => {
    formData.append("delete_images[]", deleteImage);
  })

  if(data.images){
    for (let i = 0; i < data.images.length; i++) {
      formData.append("images[]", data.images[i]);
    }
  }

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTU3MzQ0NzE0NSwiZXhwIjozNjE1NzM0NDcxNDUsIm5iZiI6MTU3MzQ0NzE0NSwianRpIjoiNnNlSHJGSjNHeXp3QzVLVyIsInN1YiI6MSwicHJ2IjoiZjkzMDdlYjVmMjljNzJhOTBkYmFhZWYwZTI2ZjAyNjJlZGU4NmY1NSJ9.IDR5-rQKJ0hRYRo2UNBtQe8AQras7CJzjgadsnzQ4HU'
    },
    body: formData
  };

  return fetch(process.env.REACT_APP_API_URL + `/product/` + id, requestOptions)
    .then(handleResponse)
    .then(product => {
      return product;
    });
}

const _addProduct= (data) => {
  let formData = new FormData();
  formData.append("name", data.name);

  formData.append("price", data.price);
  formData.append("unit", data.unit);

  data.categories.map(category => {
    formData.append("categories[]", category);
  })
  if(data.images){
    for (let i = 0; i < data.images.length; i++) {
      formData.append("images[]", data.images[i]);
    }
  }

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTU3MzQ0NzE0NSwiZXhwIjozNjE1NzM0NDcxNDUsIm5iZiI6MTU3MzQ0NzE0NSwianRpIjoiNnNlSHJGSjNHeXp3QzVLVyIsInN1YiI6MSwicHJ2IjoiZjkzMDdlYjVmMjljNzJhOTBkYmFhZWYwZTI2ZjAyNjJlZGU4NmY1NSJ9.IDR5-rQKJ0hRYRo2UNBtQe8AQras7CJzjgadsnzQ4HU'
    },
    body: formData
  };

  return fetch(process.env.REACT_APP_API_URL + `/product`, requestOptions)
    .then(handleResponse)
    .then(product => {
      return product;
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
