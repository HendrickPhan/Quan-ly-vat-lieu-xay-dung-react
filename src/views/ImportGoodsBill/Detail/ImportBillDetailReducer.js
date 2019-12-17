import {
    FETCH_IMPORT_BILL_DETAIL_SUCCESS,
    FETCH_IMPORT_BILL_DETAIL_FAILURE,
    UPDATE_IMPORT_BILL_STATUS_SUCCESS,
    UPDATE_IMPORT_BILL_STATUS_FAILURE,
    RESET_FORM,
  } from './ImportBillDetailAction';
  
  
  const initialState = {
    importBillDetails: [],
    verdorName: '',
    customerEmail: '',
    fetching: false,
    fetched: false,
    totalBill: 0,
    totalPaid: 0,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case FETCH_IMPORT_BILL_DETAIL_SUCCESS:
        console.log('selling bill detail', action.importBillDetail);
        return {
          ...state,
          fetching: false,
          fetched: true,
          importBillDetails: action.importBillDetail,
          verdorName: action.importBillDetail[0].vendor_name,
          customerEmail: action.importBillDetail[0].email,
          totalBill: action.importBillDetail[0].total_amount,
          totalPaid: action.importBillDetail[0].total_paid
        };
  
      case FETCH_IMPORT_BILL_DETAIL_FAILURE:
        return {
          ...state,
          error: action.error
        };
      
      case UPDATE_IMPORT_BILL_STATUS_SUCCESS:
        return {
          ...state,
          fetching: true,
        };
      
      case RESET_FORM:
        return initialState;
      
      case UPDATE_IMPORT_BILL_STATUS_FAILURE:
          return {
            ...state,
            fetching: true,
          };
    
      default:
        return state;
    }
  }
  