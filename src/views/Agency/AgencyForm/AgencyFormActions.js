import { displayMessage } from '../../../components/Snackbar/SnackbarActions.js';

export const FETCH_AGENCY_BEGIN = 'FETCH_AGENCY_BEGIN';
export const FETCH_AGENCY_SUCCESS = 'FETCH_AGENCY_SUCCESS';
export const FETCH_AGENCY_FAILURE = 'FETCH_AGENCY_FAILURE';
export const EDIT_AGENCY_SUCCESS = 'EDIT_AGENCY_SUCCESS';
export const EDIT_AGENCY_FAILURE = 'EDIT_AGENCY_FAILURE';
export const ADD_AGENCY_SUCCESS = 'ADD_AGENCY_SUCCESS';
export const ADD_AGENCY_FAILURE = 'ADD_AGENCY_FAILURE';
export const RESET_FORM = 'RESET_FORM';

var token = "";
if(JSON.parse(localStorage.getItem('user_info'))) {
  token = "Bearer " + JSON.parse(localStorage.getItem('user_info')).token;
}
export const fetchAgencyBegin = () => ({
  type: FETCH_AGENCY_BEGIN
});

export const fetchAgencySuccess = agency => ({
  type: FETCH_AGENCY_SUCCESS,
  agency
});

export const fetchAgencyFailure = error => ({
  type: FETCH_AGENCY_FAILURE,
  error
});

export const editAgencySuccess = agency => ({
  type: EDIT_AGENCY_SUCCESS,
  agency
});

export const editAgencyFailure = error => ({
  type: EDIT_AGENCY_FAILURE,
  error
});

export const addAgencySuccess = agency => ({
  type: ADD_AGENCY_SUCCESS,
  agency
});

export const addAgencyFailure = error => ({
  type: ADD_AGENCY_FAILURE,
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

export const fetchAgency = (id) => {
  return dispatch => {
    dispatch(fetchAgencyBegin());
    return _getAgency(id)
      .then(agency => {
        dispatch(fetchAgencySuccess(agency));
        return agency;
      })
      .catch(error =>
        dispatch(fetchAgencyFailure(error))
      );
  };
}

export const editAgency = (id, data) => {
  return dispatch => {
    dispatch(fetchAgencyBegin());
    return _editAgency(id, data)
      .then(agency => {
        dispatch(editAgencySuccess(agency));
        return agency;
      })
      .then(agency => {
        dispatch(fetchAgency(agency.id));
      })
      .then(()=>{
        dispatch(displayMessage('Cập nhập thành công', 'success', 3000));
      })
      .catch(error =>
        dispatch(editAgencyFailure(error))
      );
  };
}

export const addAgency = (data) => {
  return dispatch => {
    dispatch(fetchAgencyBegin());
    return _addAgency(data)
      .then(agency => {
        dispatch(addAgencySuccess(agency));
        return agency;
      })
      .then((agency)=>{
        dispatch(displayMessage('Thêm thành công', 'success', 3000));
        return agency;
      })
      .catch(error =>
        dispatch(addAgencyFailure(error))
      );
  };
}

const _getAgency = (id) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
  };

  return fetch(process.env.REACT_APP_API_URL + `/agency/` + id, requestOptions)
    .then(handleResponse)
    .then(agency => {
      return agency;
    });
}

const _editAgency = (id, data) => {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(data)
  };

  return fetch(process.env.REACT_APP_API_URL + `/agency/` + id, requestOptions)
    .then(handleResponse)
    .then(agency => {
      return agency;
    });
}

const _addAgency= (data) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(data)
  };

  return fetch(process.env.REACT_APP_API_URL + `/agency`, requestOptions)
    .then(handleResponse)
    .then(agency => {
      return agency;
    });
}

const handleResponse = (response) => {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    console.log(data);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  })
}
