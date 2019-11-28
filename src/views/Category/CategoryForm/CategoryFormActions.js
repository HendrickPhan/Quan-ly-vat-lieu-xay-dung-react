import { displayMessage } from '../../../components/Snackbar/SnackbarActions.js';

export const FETCH_CATEGORY_BEGIN = 'FETCH_CATEGORY_BEGIN';
export const FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS';
export const FETCH_CATEGORY_FAILURE = 'FETCH_CATEGORY_FAILURE';
export const FETCH_CATEGORY_SELECT_LIST_SUCCESS = 'FETCH_CATEGORY_SELECT_LIST_SUCCESS';
export const FETCH_CATEGORY_SELECT_LIST_FAILURE = 'FETCH_CATEGORY_SELECT_LIST_FAILURE';
export const EDIT_CATEGORY_SUCCESS = 'EDIT_CATEGORY_SUCCESS';
export const EDIT_CATEGORY_FAILURE = 'EDIT_CATEGORY_FAILURE';
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';
export const ADD_CATEGORY_FAILURE = 'ADD_CATEGORY_FAILURE';
export const RESET_FORM = 'RESET_FORM';


export const fetchCategoryBegin = () => ({
  type: FETCH_CATEGORY_BEGIN
});

export const fetchCategorySuccess = category => ({
  type: FETCH_CATEGORY_SUCCESS,
  category
});

export const fetchCategoryFailure = error => ({
  type: FETCH_CATEGORY_FAILURE,
  error
});

export const fetchCategorySelectListSuccess = categorySelectList => ({
  type: FETCH_CATEGORY_SELECT_LIST_SUCCESS,
  categorySelectList
});

export const fetchCategorySelectListFailure = error => ({
  type: FETCH_CATEGORY_SELECT_LIST_FAILURE,
  error
});

export const editCategorySuccess = category => ({
  type: EDIT_CATEGORY_SUCCESS,
  category
});

export const editCategoryFailure = error => ({
  type: EDIT_CATEGORY_FAILURE,
  payload: { error }
});

export const addCategorySuccess = category => ({
  type: ADD_CATEGORY_SUCCESS,
  category
});

export const addCategoryFailure = error => ({
  type: ADD_CATEGORY_FAILURE,
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

export const fetchCategory = (id) => {
  return dispatch => {
    dispatch(fetchCategoryBegin());
    return _getCategory(id)
      .then(category => {
        dispatch(fetchCategorySuccess(category));
        return category;
      })
      .catch(error =>
        dispatch(fetchCategoryFailure(error))
      );
  };
}

export const fetchCategorySelectList = (id) => {
  return dispatch => {
    dispatch(fetchCategoryBegin());
    return _getCategorySelectList(id)
      .then(categorySelectList => {
        dispatch(fetchCategorySelectListSuccess(categorySelectList));
        return categorySelectList;
      })
      .catch(error =>
        dispatch(fetchCategorySelectListFailure(error))
      );
  };
}

export const editCategory = (id, data) => {
  return dispatch => {
    dispatch(fetchCategoryBegin());
    return _editCategory(id, data)
      .then(category => {
        dispatch(editCategorySuccess(category));
        return category;
      })
      .then(category => {
        dispatch(fetchCategory(category.id));
      })
      .then(()=>{
        dispatch(displayMessage('Cập nhập thành công', 'success', 3000));
      })
      .catch(error =>
        dispatch(editCategoryFailure(error))
      );
  };
}

export const addCategory = (data) => {
  return dispatch => {
    dispatch(fetchCategoryBegin());
    return _addCategory(data)
      .then(category => {
        dispatch(addCategorySuccess(category));
        return category;
      })
      .then((category)=>{
        dispatch(displayMessage('Thêm thành công', 'success', 3000));
        return category;
      })
      .catch(error =>
        dispatch(addCategoryFailure(error))
      );
  };
}

const _getCategory = (id) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTU3MzQ0NzE0NSwiZXhwIjozNjE1NzM0NDcxNDUsIm5iZiI6MTU3MzQ0NzE0NSwianRpIjoiNnNlSHJGSjNHeXp3QzVLVyIsInN1YiI6MSwicHJ2IjoiZjkzMDdlYjVmMjljNzJhOTBkYmFhZWYwZTI2ZjAyNjJlZGU4NmY1NSJ9.IDR5-rQKJ0hRYRo2UNBtQe8AQras7CJzjgadsnzQ4HU'
    },
  };

  return fetch(process.env.REACT_APP_API_URL + `/category/` + id, requestOptions)
    .then(handleResponse)
    .then(category => {
      return category;
    });
}

const _getCategorySelectList = () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTU3MzQ0NzE0NSwiZXhwIjozNjE1NzM0NDcxNDUsIm5iZiI6MTU3MzQ0NzE0NSwianRpIjoiNnNlSHJGSjNHeXp3QzVLVyIsInN1YiI6MSwicHJ2IjoiZjkzMDdlYjVmMjljNzJhOTBkYmFhZWYwZTI2ZjAyNjJlZGU4NmY1NSJ9.IDR5-rQKJ0hRYRo2UNBtQe8AQras7CJzjgadsnzQ4HU'
    },
  };

  return fetch(process.env.REACT_APP_API_URL + `/category/select-list`, requestOptions)
    .then(handleResponse)
    .then(categorySelectList => {
      return categorySelectList;
    });
}

const _editCategory = (id, data) => {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTU3MzQ0NzE0NSwiZXhwIjozNjE1NzM0NDcxNDUsIm5iZiI6MTU3MzQ0NzE0NSwianRpIjoiNnNlSHJGSjNHeXp3QzVLVyIsInN1YiI6MSwicHJ2IjoiZjkzMDdlYjVmMjljNzJhOTBkYmFhZWYwZTI2ZjAyNjJlZGU4NmY1NSJ9.IDR5-rQKJ0hRYRo2UNBtQe8AQras7CJzjgadsnzQ4HU'
    },
    body: JSON.stringify(data)
  };

  return fetch(process.env.REACT_APP_API_URL + `/category/` + id, requestOptions)
    .then(handleResponse)
    .then(category => {
      return category;
    });
}

const _addCategory= (data) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTU3MzQ0NzE0NSwiZXhwIjozNjE1NzM0NDcxNDUsIm5iZiI6MTU3MzQ0NzE0NSwianRpIjoiNnNlSHJGSjNHeXp3QzVLVyIsInN1YiI6MSwicHJ2IjoiZjkzMDdlYjVmMjljNzJhOTBkYmFhZWYwZTI2ZjAyNjJlZGU4NmY1NSJ9.IDR5-rQKJ0hRYRo2UNBtQe8AQras7CJzjgadsnzQ4HU'
    },
    body: JSON.stringify(data)
  };

  return fetch(process.env.REACT_APP_API_URL + `/category`, requestOptions)
    .then(handleResponse)
    .then(category => {
      return category;
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
