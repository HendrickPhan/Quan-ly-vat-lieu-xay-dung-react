import { displayMessage } from '../../components/Snackbar/SnackbarActions.js';

export const FETCH_VENDORS_BEGIN = 'FETCH_VENDORS_BEGIN';
export const FETCH_VENDORS_SUCCESS = 'FETCH_VENDORS_SUCCESS';
export const FETCH_VENDORS_FAILURE = 'FETCH_VENDORS_FAILURE';
export const CHANGE_PER_PAGE = 'CHANGE_PER_PAGE';
export const DELETE_VENDOR = 'DELETE_VENDOR';

var token = "";
if(JSON.parse(localStorage.getItem('user_info'))) {
  token = "Bearer " + JSON.parse(localStorage.getItem('user_info')).token;
}

export const fetchVendorsBegin = () => ({
  type: FETCH_VENDORS_BEGIN
});

export const fetchVendorsSuccess = vendors => ({
  type: FETCH_VENDORS_SUCCESS,
  vendors
});

export const fetchVendorsFailure = error => ({
  type: FETCH_VENDORS_FAILURE,
  error
});

export const deleteVendorSuccess = id => ({
  type: DELETE_VENDOR,
  id
});

export const fetchVendors = (page, perPage) => {
  return dispatch => {
    dispatch(fetchVendorsBegin());
    return _getVendors(page, perPage)
      .then(vendors => {
        dispatch(fetchVendorsSuccess(vendors));
        return vendors;
      })
      .catch(error =>
        dispatch(fetchVendorsFailure(error))
      );
  };
}

export const deleteVendor = (id) => {
  return dispatch => {
    return _deleteVendor(id)
      .then(id => {
        dispatch(deleteVendorSuccess(id))
      })
      .then(()=>{
        dispatch(displayMessage('Xóa thành công', 'success', 3000));
      })
  }
}

export const changePerPage = (perPage) => {
  return dispatch => {
    dispatch(fetchPerPage(perPage)); 
    dispatch(fetchVendors(1, perPage));
  };
}

const fetchPerPage = (perPage) => ({
  type: CHANGE_PER_PAGE,
  perPage
})

const _deleteVendor = (id) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
  };

  return fetch(process.env.REACT_APP_API_URL + `/vendor/` + id, requestOptions)
    .then(handleResponse)
    .then(() => {
      return id;
    });
}

const _getVendors = (page, perPage) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
  };

  return fetch(process.env.REACT_APP_API_URL + `/vendor?page=` + page + '&limit=' + perPage, requestOptions)
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
