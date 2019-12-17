import {
    FETCH_SELLING_BILL_DETAIL_SUCCESS,
    FETCH_SELLING_BILL_DETAIL_FAILURE,
    UPDATE_SELLING_BILL_STATUS_SUCCESS,
    UPDATE_SELLING_BILL_STATUS_FAILURE,
    RESET_FORM,
  } from './SellingBillDetailAction';
  
  
  const initialState = {
    sellingBillDetails: [],
    customerName: '',
    customerPhone: '',
    fetching: false,
    fetched: false,
    totalBill: 0,
    totalPaid: 0,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case FETCH_SELLING_BILL_DETAIL_SUCCESS:
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
  