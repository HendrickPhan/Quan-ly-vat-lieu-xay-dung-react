import { displayMessage } from '../../components/Snackbar/SnackbarActions.js';

export const FETCH_USERS_BEGIN = 'FETCH_USERS_BEGIN';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const CHANGE_PER_PAGE = 'CHANGE_PER_PAGE';
export const DELETE_USER = 'DELETE_USER';

var token = "";
if(JSON.parse(localStorage.getItem('user_info'))) {
  token = "Bearer " + JSON.parse(localStorage.getItem('user_info')).token;
}

export const fetchUsersBegin = () => ({
  type: FETCH_USERS_BEGIN
});

export const fetchUsersSuccess = users => ({
  type: FETCH_USERS_SUCCESS,
  users
});

export const fetchUsersFailure = error => ({
  type: FETCH_USERS_FAILURE,
  error
});

export const deleteUserSuccess = id => ({
  type: DELETE_USER,
  id
});

export const fetchUsers = (page, perPage) => {
  return dispatch => {
    dispatch(fetchUsersBegin());
    return _getUsers(page, perPage)
      .then(users => {
        dispatch(fetchUsersSuccess(users));
        return users;
      })
      .catch(error =>
        dispatch(fetchUsersFailure(error))
      );
  };
}

export const deleteUser = (id) => {
  return dispatch => {
    return _deleteUser(id)
      .then(id => {
        dispatch(deleteUserSuccess(id))
      })
      .then(()=>{
        dispatch(displayMessage('Xóa thành công', 'success', 3000));
      })
  }
}

export const changePerPage = (perPage) => {
  return dispatch => {
    dispatch(fetchPerPage(perPage)); 
    dispatch(fetchUsers(1, perPage));
  };
}

const fetchPerPage = (perPage) => ({
  type: CHANGE_PER_PAGE,
  perPage
})

const _deleteUser = (id) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token
    },
  };

  return fetch(process.env.REACT_APP_API_URL + `/user/` + id, requestOptions)
    .then(handleResponse)
    .then(() => {
      return id;
    });
}

const _getUsers = (page, perPage) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token
    },
  };

  return fetch(process.env.REACT_APP_API_URL + `/user?page=` + page + '&limit=' + perPage, requestOptions)
    .then(handleResponse)
    .then(users => {
      return users;
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
