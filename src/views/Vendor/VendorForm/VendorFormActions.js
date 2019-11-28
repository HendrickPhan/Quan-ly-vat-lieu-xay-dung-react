import { displayMessage } from '../../../components/Snackbar/SnackbarActions.js';

export const FETCH_VENDOR_BEGIN = 'FETCH_VENDOR_BEGIN';
export const FETCH_VENDOR_SUCCESS = 'FETCH_VENDOR_SUCCESS';
export const FETCH_VENDOR_FAILURE = 'FETCH_VENDOR_FAILURE';
export const EDIT_VENDOR_SUCCESS = 'EDIT_VENDOR_SUCCESS';
export const EDIT_VENDOR_FAILURE = 'EDIT_VENDOR_FAILURE';
export const ADD_VENDOR_SUCCESS = 'ADD_VENDOR_SUCCESS';
export const ADD_VENDOR_FAILURE = 'ADD_VENDOR_FAILURE';
export const RESET_FORM = 'RESET_FORM';

var token = "";
if(JSON.parse(localStorage.getItem('user_info'))) {
  token = "Bearer " + JSON.parse(localStorage.getItem('user_info')).token;
}

export const fetchVendorBegin = () => ({
  type: FETCH_VENDOR_BEGIN
});

export const fetchVendorSuccess = vendor => ({
  type: FETCH_VENDOR_SUCCESS,
  vendor
});

export const fetchVendorFailure = error => ({
  type: FETCH_VENDOR_FAILURE,
  error
});

export const editVendorSuccess = vendor => ({
  type: EDIT_VENDOR_SUCCESS,
  vendor
});

export const editVendorFailure = error => ({
  type: EDIT_VENDOR_FAILURE,
  error
});

export const addVendorSuccess = vendor => ({
  type: ADD_VENDOR_SUCCESS,
  vendor
});

export const addVendorFailure = error => ({
  type: ADD_VENDOR_FAILURE,
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

export const fetchVendor = (id) => {
  return dispatch => {
    dispatch(fetchVendorBegin());
    return _getVendor(id)
      .then(vendor => {
        dispatch(fetchVendorSuccess(vendor));
        return vendor;
      })
      .catch(error =>
        dispatch(fetchVendorFailure(error))
      );
  };
}

export const editVendor = (id, data) => {
  return dispatch => {
    dispatch(fetchVendorBegin());
    return _editVendor(id, data)
      .then(vendor => {
        dispatch(editVendorSuccess(vendor));
        return vendor;
      })
      .then(vendor => {
        dispatch(fetchVendor(vendor.id));
      })
      .then(()=>{
        dispatch(displayMessage('Cập nhập thành công', 'success', 3000));
      })
      .catch(error =>
        dispatch(editVendorFailure(error))
      );
  };
}

export const addVendor = (data) => {
  return dispatch => {
    dispatch(fetchVendorBegin());
    return _addVendor(data)
      .then(vendor => {
        dispatch(addVendorSuccess(vendor));
        return vendor;
      })
      .then((vendor)=>{
        dispatch(displayMessage('Thêm thành công', 'success', 3000));
        return vendor;
      })
      .catch(error =>
        dispatch(addVendorFailure(error))
      );
  };
}

const _getVendor = (id) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token
    },
  };

  return fetch(process.env.REACT_APP_API_URL + `/vendor/` + id, requestOptions)
    .then(handleResponse)
    .then(vendor => {
      return vendor;
    });
}

const _editVendor = (id, data) => {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(data)
  };

  return fetch(process.env.REACT_APP_API_URL + `/vendor/` + id, requestOptions)
    .then(handleResponse)
    .then(vendor => {
      return vendor;
    });
}

const _addVendor= (data) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(data)
  };

  return fetch(process.env.REACT_APP_API_URL + `/vendor`, requestOptions)
    .then(handleResponse)
    .then(vendor => {
      return vendor;
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
