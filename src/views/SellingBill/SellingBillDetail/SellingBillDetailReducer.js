import {
    FETCH_SELLING_BILL_DETAIL_SUCCESS,
    FETCH_SELLING_BILL_DETAIL_FAILURE,
    UPDATE_SELLING_BILL_STATUS_SUCCESS,
    UPDATE_SELLING_BILL_STATUS_FAILURE,
    RESET_FORM,
  } from './SellingBillDetailAction';
  
  
  const initialState = {
    sellingBillDetails: [],
    fetching: false,
    fetched: false,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case FETCH_SELLING_BILL_DETAIL_SUCCESS:
        return {
          ...state,
          fetching: false,
          fetched: true,
          sellingBillDetails: action.sellingBillDetails
        };
  
      case FETCH_SELLING_BILL_DETAIL_FAILURE:
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
  