import { displayMessage } from '../../../components/Snackbar/SnackbarActions.js';

export const FETCH_SELLING_BILL_DETAIL_SUCCESS = 'FETCH_SELLING_BILL_DETAIL_SUCCESS';
export const FETCH_SELLING_BILL_DETAIL_FAILURE = 'FETCH_SELLING_BILL_DETAIL_FAILURE';
export const UPDATE_SELLING_BILL_STATUS_SUCCESS = 'UPDATE_SELLING_BILL_STATUS_SUCCESS';
export const UPDATE_SELLING_BILL_STATUS_FAILURE = 'UPDATE_SELLING_BILL_STATUS_FAILURE';
export const RESET_FORM = 'RESET_FORM';

var token = "";
if(JSON.parse(localStorage.getItem('user_info'))) {
  token = "Bearer " + JSON.parse(localStorage.getItem('user_info')).token;
}

export const fetchSellingBillDetailSuccess = sellingBillDetail => ({
  type: FETCH_SELLING_BILL_DETAIL_SUCCESS,
  sellingBillDetail
});

export const fetchSellingBillDetailFailure = error => ({
  type: FETCH_SELLING_BILL_DETAIL_FAILURE,
  error
});

export const updateSellingBillStatusSuccess = sellingBillDetail => ({
  type: UPDATE_SELLING_BILL_STATUS_SUCCESS,
  sellingBillDetail
});

export const updateSellingBillStatusFailure = error => ({
  type: UPDATE_SELLING_BILL_STATUS_FAILURE,
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

export const fetchSellingBillDetail = (id) => {
  return dispatch => {
    return _getSellingBillDetail(id)
      .then(billDetail => {
        dispatch(fetchSellingBillDetailSuccess(billDetail));
        return billDetail;
      })
      .catch(error =>
        dispatch(fetchSellingBillDetailFailure(error))
      );
  };
}

export const updateSellingBillStatus = (id) => {
  return dispatch => {
    return _updateSellingBillStatus(id)
      .then(bill => {
        dispatch(updateSellingBillStatusSuccess(bill));
        return bill;
      })
      .then(()=>{
        dispatch(displayMessage('Cập nhập thành công', 'success', 3000));
      })
      .catch(error =>
        dispatch(updateSellingBillStatusFailure(error))
      );
  };
}

const _getSellingBillDetail = (id) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
  };

  return fetch(process.env.REACT_APP_API_URL + `/selling-bill/` + id, requestOptions)
    .then(handleResponse)
    .then(bill => {
        console.log('this is bill detail', bill);
      return bill;
    });
}

const _updateSellingBillStatus = (id) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': token
    },
  };

  return fetch(process.env.REACT_APP_API_URL + `/selling-bill/` + id, requestOptions)
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
