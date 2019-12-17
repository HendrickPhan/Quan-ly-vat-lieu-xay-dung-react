import { displayMessage } from '../../../components/Snackbar/SnackbarActions.js';

export const FETCH_IMPORT_BILL_DETAIL_SUCCESS = 'FETCH_IMPORT_BILL_DETAIL_SUCCESS';
export const FETCH_IMPORT_BILL_DETAIL_FAILURE = 'FETCH_IMPORT_BILL_DETAIL_FAILURE';
export const UPDATE_IMPORT_BILL_STATUS_SUCCESS = 'UPDATE_IMPORT_BILL_STATUS_SUCCESS';
export const UPDATE_IMPORT_BILL_STATUS_FAILURE = 'UPDATE_IMPORT_BILL_STATUS_FAILURE';
export const RESET_FORM = 'RESET_FORM';

var token = "";
if(JSON.parse(localStorage.getItem('user_info'))) {
  token = "Bearer " + JSON.parse(localStorage.getItem('user_info')).token;
}

export const fetchImportBillDetailSuccess = importBillDetail => ({
  type: FETCH_IMPORT_BILL_DETAIL_SUCCESS,
  importBillDetail
});

export const fetchImportBillDetailFailure = error => ({
  type: FETCH_IMPORT_BILL_DETAIL_FAILURE,
  error
});

export const updateImportBillStatusSuccess = importBillDetail => ({
  type: UPDATE_IMPORT_BILL_STATUS_SUCCESS,
  importBillDetail
});

export const updateImportBillStatusFailure = error => ({
  type: UPDATE_IMPORT_BILL_STATUS_FAILURE,
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

export const fetchImportBillDetail = (id) => {
  return dispatch => {
    return _getImportBillDetail(id)
      .then(billDetail => {
        dispatch(fetchImportBillDetailSuccess(billDetail));
        return billDetail;
      })
      .catch(error =>
        dispatch(fetchImportBillDetailFailure(error))
      );
  };
}

export const updateImportBillStatus = (id) => {
  return dispatch => {
    return _updateImportBillStatus(id)
      .then(bill => {
        dispatch(updateImportBillStatusSuccess(bill));
        return bill;
      })
      .then(()=>{
        dispatch(displayMessage('Cập nhập thành công', 'success', 3000));
      })
      .catch(error =>
        dispatch(updateImportBillStatusFailure(error))
      );
  };
}

const _getImportBillDetail = (id) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
  };

  return fetch(process.env.REACT_APP_API_URL + `/import-goods-bill/` + id, requestOptions)
    .then(handleResponse)
    .then(bill => {
      return bill;
    });
}

const _updateImportBillStatus = (id) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': token
    },
  };

  return fetch(process.env.REACT_APP_API_URL + `/import-goods-bill/` + id, requestOptions)
    .then(handleResponse)
    .then(bill => {
      return bill;
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
