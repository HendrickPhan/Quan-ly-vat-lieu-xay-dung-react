import {
    FETCH_IMPORT_BILL_DETAIL_SUCCESS,
    FETCH_IMPORT_BILL_DETAIL_FAILURE,
    UPDATE_IMPORT_BILL_STATUS_SUCCESS,
    UPDATE_IMPORT_BILL_STATUS_FAILURE,
    RESET_FORM,
  } from './ImportBillDetailAction';
  
  
  const initialState = {
    importBillDetails: [],
    vendorName: '',
    vendorEmail: '',
    fetching: false,
    fetched: false,
    totalBill: 0,
    totalPaid: 0,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case FETCH_IMPORT_BILL_DETAIL_SUCCESS:
       
        return {
          ...state,
          fetching: false,
          fetched: true,
          importBillDetails: action.importBillDetail,
          vendorName: action.importBillDetail[0].vendor_name,
          vendorEmail: action.importBillDetail[0].vendor_email,
          totalBill: action.importBillDetail[0].IG_total_amount,
          totalPaid: action.importBillDetail[0].IG_total_paid,
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
  