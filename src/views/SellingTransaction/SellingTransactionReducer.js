import {
    FETCH_SELLING_TRANSACTION_CUSTOMER_SUCCESS,
    FETCH_SELLING_TRANSACTION_CUSTOMER_FAILURE,
    ADD_SELLING_TRANSACTION_SUCCESS,
    ADD_SELLING_TRANSACTION_FAILURE,
    RESET_FORM,
  } from './SellingTransactionAction';
  
  
  const initialState = {
    customers: [],
    fetching: false,
    fetched: false,
    amount: 0,
    total_amount: 0,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case FETCH_SELLING_TRANSACTION_CUSTOMER_SUCCESS:
        console.log('selling bill detail', action.sellingBillDetail.selling_bill_detail);
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
  
      case FETCH_SELLING_TRANSACTION_CUSTOMER_FAILURE:
        return {
          ...state,
          error: action.error
        };
      
      case ADD_SELLING_TRANSACTION_SUCCESS:
        return {
          ...state,
          fetching: true,
        };
      
      case ADD_SELLING_TRANSACTION_FAILURE:
      return {
        ...state,
        error: action.error
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
  