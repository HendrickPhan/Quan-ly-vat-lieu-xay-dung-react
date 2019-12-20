import {
    FETCH_SELLING_BILL_DETAIL_SUCCESS,
    FETCH_SELLING_BILL_DETAIL_FAILURE,
    FETCH_SELLING_TRANSACTION_SUCCESS,
    FETCH_SELLING_TRANSACTION_FAILURE,
    UPDATE_SELLING_BILL_STATUS_SUCCESS,
    UPDATE_SELLING_BILL_STATUS_FAILURE,
    ADD_TRANSACTION_SUCCESS,
    ADD_TRANSACTION_FAILURE,
    RESET_FORM,
  } from './SellingBillDetailAction';
  
  
  const initialState = {
    sellingBillDetails: [],
    transactions: [],
    customerName: '',
    customerPhone: '',
    fetching: false,
    fetched: false,
    totalBill: 0,
    totalPaid: 0,
    amountTrans: 0
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case FETCH_SELLING_BILL_DETAIL_SUCCESS:
        return {
          ...state,
          fetching: false,
          fetched: true,
          sellingBillDetails: action.sellingBillDetail.selling_bill_detail,
          customerName: action.sellingBillDetail.customer.name,
          customerPhone: action.sellingBillDetail.customer.phone,
          totalBill: action.sellingBillDetail.total_amount,
          totalPaid: action.sellingBillDetail.total_paid
        };
  
      case FETCH_SELLING_BILL_DETAIL_FAILURE:
        return {
          ...state,
          error: action.error
        };
      
      case ADD_TRANSACTION_FAILURE:
        return {
          ...state,
          error: action.error
        };

      case ADD_TRANSACTION_SUCCESS:
        return {
          ...state,
          error: action.message
        };

      case FETCH_SELLING_TRANSACTION_SUCCESS:
        return {
          ...state,
          fetching: false,
          fetched: true,
          transactions: action.transactions
        };
  
      case FETCH_SELLING_TRANSACTION_FAILURE:
        return {
          ...state,
          error: action.error
        };
        

      case UPDATE_SELLING_BILL_STATUS_SUCCESS:
        return {
          ...state,
          fetching: true,
        };
      
      case RESET_FORM:
        return initialState;
      
      case UPDATE_SELLING_BILL_STATUS_FAILURE:
          return {
            ...state,
            fetching: true,
          };
    
      default:
        return state;
    }
  }
  