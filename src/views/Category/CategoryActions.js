import { displayMessage } from '../../components/Snackbar/SnackbarActions.js';

export const FETCH_CATEGORIES_BEGIN = 'FETCH_CATEGORIES_BEGIN';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';
export const CHANGE_PER_PAGE = 'CHANGE_PER_PAGE';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';

var token = "";
if(JSON.parse(localStorage.getItem('user_info'))) {
  token = "Bearer " + JSON.parse(localStorage.getItem('user_info')).token;
}
export const fetchCategoriesBegin = () => ({
  type: FETCH_CATEGORIES_BEGIN
});

export const fetchCategoriesSuccess = categories => ({
  type: FETCH_CATEGORIES_SUCCESS,
  categories
});

export const fetchCategoriesFailure = error => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: { error }
});

export const deleteCategorySuccess = id => ({
  type: DELETE_CATEGORY,
  id
});

export const fetchCategories = (page, perPage) => {
  return dispatch => {
    dispatch(fetchCategoriesBegin());
    return _getCategories(page, perPage)
      .then(categories => {
        dispatch(fetchCategoriesSuccess(categories));
        return categories;
      })
      .catch(error =>
        dispatch(fetchCategoriesFailure(error))
      );
  };
}

export const deleteCategory = (id) => {
  return dispatch => {
    return _deleteCategory(id)
      .then(id => {
        dispatch(deleteCategorySuccess(id))
      })
      .then(()=>{
        dispatch(displayMessage('Xóa thành công', 'success', 3000));
      })
  }
}

export const changePerPage = (perPage) => {
  return dispatch => {
    dispatch(fetchPerPage(perPage)); 
    dispatch(fetchCategories(1, perPage));
  };
}

const fetchPerPage = (perPage) => ({
  type: CHANGE_PER_PAGE,
  perPage
})

const _deleteCategory = (id) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
  };

  return fetch(process.env.REACT_APP_API_URL + `/category/` + id, requestOptions)
    .then(handleResponse)
    .then(() => {
      return id;
    });
}

const _getCategories = (page, perPage) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
  };

  return fetch(process.env.REACT_APP_API_URL + `/category?page=` + page + '&limit=' + perPage, requestOptions)
    .then(handleResponse)
    .then(categories => {
      return categories;
    });
}

const handleResponse = (response) => {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      console.log(token);
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    // const mark = '_ ';
    // let formatedCategories = data.data.filter((category) => {
    //     if(category.depth !== 0) {
    //       category.name = mark.repeat(category.depth) + category.name;
    //     }
    //     return category;
    // })
    
    // data.data = formatedCategories;
    return data;
  })
}
