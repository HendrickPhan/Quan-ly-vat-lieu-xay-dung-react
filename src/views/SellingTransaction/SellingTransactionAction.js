import { displayMessage } from '../../../components/Snackbar/SnackbarActions.js';

export const FETCH_SELLING_TRANSACTION_CUSTOMER_SUCCESS = 'FETCH_SELLING_TRANSACTION_CUSTOMER_SUCCESS';
export const FETCH_SELLING_TRANSACTION_CUSTOMER_FAILURE = 'FETCH_SELLING_TRANSACTION_CUSTOMER_FAILURE';
export const ADD_SELLING_TRANSACTION_SUCCESS = 'ADD_SELLING_TRANSACTION_SUCCESS';
export const ADD_SELLING_TRANSACTION_FAILURE = 'ADD_SELLING_TRANSACTION_FAILURE';
export const RESET_FORM = 'RESET_FORM';

var token = "";
if(JSON.parse(localStorage.getItem('user_info'))) {
  token = "Bearer " + JSON.parse(localStorage.getItem('user_info')).token;
}

  export const fetchSellingTransactionCustomerSuccess = customers => ({
    type: FETCH_SELLING_TRANSACTION_CUSTOMER_SUCCESS,
    customers
  });
  
  export const fetchSellingTransactionCustomerFailure = error => ({
    type: FETCH_SELLING_TRANSACTION_CUSTOMER_FAILURE,
    error
  });

  export const addSellingTransactionSuccess = transaction => ({
    type: ADD_SELLING_TRANSACTION_SUCCESS,
    transaction
  });
  
  export const addSellingTransactionFailure = error => ({
    type: ADD_SELLING_TRANSACTION_FAILURE,
    error
  });
  
