import { displayMessage } from '../../components/Snackbar/SnackbarActions.js';

export const FETCH_AGENCIES_BEGIN = 'FETCH_AGENCIES_BEGIN';
export const FETCH_AGENCIES_SUCCESS = 'FETCH_AGENCIES_SUCCESS';
export const FETCH_AGENCIES_FAILURE = 'FETCH_AGENCIES_FAILURE';
export const CHANGE_PER_PAGE = 'CHANGE_PER_PAGE';
export const DELETE_AGENCY = 'DELETE_AGENCY';

export const fetchAgenciesBegin = () => ({
  type: FETCH_AGENCIES_BEGIN
});

export const fetchAgenciesSuccess = agencies => ({
  type: FETCH_AGENCIES_SUCCESS,
  agencies
});

export const fetchAgenciesFailure = error => ({
  type: FETCH_AGENCIES_FAILURE,
  error
});

export const deleteAgencySuccess = id => ({
  type: DELETE_AGENCY,
  id
});

export const fetchAgencies = (page, perPage) => {
  return dispatch => {
    dispatch(fetchAgenciesBegin());
    return _getAgencies(page, perPage)
      .then(agencies => {
        dispatch(fetchAgenciesSuccess(agencies));
        return agencies;
      })
      .catch(error =>
        dispatch(fetchAgenciesFailure(error))
      );
  };
}

export const deleteAgency = (id) => {
  return dispatch => {
    return _deleteAgency(id)
      .then(id => {
        dispatch(deleteAgencySuccess(id))
      })
      .then(()=>{
        dispatch(displayMessage('Xóa thành công', 'success', 3000));
      })
  }
}

export const changePerPage = (perPage) => {
  return dispatch => {
    dispatch(fetchPerPage(perPage)); 
    dispatch(fetchAgencies(1, perPage));
  };
}

const fetchPerPage = (perPage) => ({
  type: CHANGE_PER_PAGE,
  perPage
})

const _deleteAgency = (id) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTU3MzQ0NzE0NSwiZXhwIjozNjE1NzM0NDcxNDUsIm5iZiI6MTU3MzQ0NzE0NSwianRpIjoiNnNlSHJGSjNHeXp3QzVLVyIsInN1YiI6MSwicHJ2IjoiZjkzMDdlYjVmMjljNzJhOTBkYmFhZWYwZTI2ZjAyNjJlZGU4NmY1NSJ9.IDR5-rQKJ0hRYRo2UNBtQe8AQras7CJzjgadsnzQ4HU'
    },
  };

  return fetch(process.env.REACT_APP_API_URL + `/agency/` + id, requestOptions)
    .then(handleResponse)
    .then(() => {
      return id;
    });
}

const _getAgencies = (page, perPage) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTU3MzQ0NzE0NSwiZXhwIjozNjE1NzM0NDcxNDUsIm5iZiI6MTU3MzQ0NzE0NSwianRpIjoiNnNlSHJGSjNHeXp3QzVLVyIsInN1YiI6MSwicHJ2IjoiZjkzMDdlYjVmMjljNzJhOTBkYmFhZWYwZTI2ZjAyNjJlZGU4NmY1NSJ9.IDR5-rQKJ0hRYRo2UNBtQe8AQras7CJzjgadsnzQ4HU'
    },
  };

  return fetch(process.env.REACT_APP_API_URL + `/agency?page=` + page + '&limit=' + perPage, requestOptions)
    .then(handleResponse)
    .then(agencies => {
      return agencies;
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
