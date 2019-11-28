import { displayMessage } from '../../../components/Snackbar/SnackbarActions.js';

export const FETCH_USER_BEGIN = 'FETCH_USER_BEGIN';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILURE = 'EDIT_USER_FAILURE';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';
export const RESET_FORM = 'RESET_FORM';


export const fetchUserBegin = () => ({
  type: FETCH_USER_BEGIN
});

export const fetchUserSuccess = user => ({
  type: FETCH_USER_SUCCESS,
  user
});

export const fetchUserFailure = error => ({
  type: FETCH_USER_FAILURE,
  error
});

export const editUserSuccess = user => ({
  type: EDIT_USER_SUCCESS,
  user
});

export const editUserFailure = error => ({
  type: EDIT_USER_FAILURE,
  error
});

export const addUserSuccess = user => ({
  type: ADD_USER_SUCCESS,
  user
});

export const addUserFailure = error => ({
  type: ADD_USER_FAILURE,
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

export const fetchUser = (id) => {
  return dispatch => {
    dispatch(fetchUserBegin());
    return _getUser(id)
      .then(user => {
        dispatch(fetchUserSuccess(user));
        return user;
      })
      .catch(error =>
        dispatch(fetchUserFailure(error))
      );
  };
}

export const editUser = (id, data) => {
  return dispatch => {
    dispatch(fetchUserBegin());
    return _editUser(id, data)
      .then(user => {
        dispatch(editUserSuccess(user));
        return user;
      })
      .then(user => {
        dispatch(fetchUser(user.id));
      })
      .then(()=>{
        dispatch(displayMessage('Cập nhập thành công', 'success', 3000));
      })
      .catch(error =>
        dispatch(editUserFailure(error))
      );
  };
}

export const addUser = (data) => {
  return dispatch => {
    dispatch(fetchUserBegin());
    return _addUser(data)
      .then(user => {
        dispatch(addUserSuccess(user));
        return user;
      })
      .then((user)=>{
        dispatch(displayMessage('Thêm thành công', 'success', 3000));
        return user;
      })
      .catch(error =>{
        dispatch(addUserFailure(error))
      });
  };
}

const _getUser = (id) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTU3MzQ0NzE0NSwiZXhwIjozNjE1NzM0NDcxNDUsIm5iZiI6MTU3MzQ0NzE0NSwianRpIjoiNnNlSHJGSjNHeXp3QzVLVyIsInN1YiI6MSwicHJ2IjoiZjkzMDdlYjVmMjljNzJhOTBkYmFhZWYwZTI2ZjAyNjJlZGU4NmY1NSJ9.IDR5-rQKJ0hRYRo2UNBtQe8AQras7CJzjgadsnzQ4HU'
    },
  };
  return fetch(process.env.REACT_APP_API_URL + `/user/` + id, requestOptions)
    .then(handleResponse)
    .then(user => {
      let formatedUser = user;
      formatedUser.fetchedAvatar = user.avatar; 
      formatedUser.avatar = null;
      return formatedUser;
    });
}

const _editUser = (id, data) => {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTU3MzQ0NzE0NSwiZXhwIjozNjE1NzM0NDcxNDUsIm5iZiI6MTU3MzQ0NzE0NSwianRpIjoiNnNlSHJGSjNHeXp3QzVLVyIsInN1YiI6MSwicHJ2IjoiZjkzMDdlYjVmMjljNzJhOTBkYmFhZWYwZTI2ZjAyNjJlZGU4NmY1NSJ9.IDR5-rQKJ0hRYRo2UNBtQe8AQras7CJzjgadsnzQ4HU'
    },
    body: JSON.stringify(data)
  };

  return fetch(process.env.REACT_APP_API_URL + `/user/` + id, requestOptions)
    .then(handleResponse)
    .then(user => {
      return user;
    });
}

const _addUser= (data) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTU3MzQ0NzE0NSwiZXhwIjozNjE1NzM0NDcxNDUsIm5iZiI6MTU3MzQ0NzE0NSwianRpIjoiNnNlSHJGSjNHeXp3QzVLVyIsInN1YiI6MSwicHJ2IjoiZjkzMDdlYjVmMjljNzJhOTBkYmFhZWYwZTI2ZjAyNjJlZGU4NmY1NSJ9.IDR5-rQKJ0hRYRo2UNBtQe8AQras7CJzjgadsnzQ4HU'
    },
    body: JSON.stringify(data)
  };

  return fetch(process.env.REACT_APP_API_URL + `/user`, requestOptions)
    .then(handleResponse)
    .then(user => {
      return user;
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
