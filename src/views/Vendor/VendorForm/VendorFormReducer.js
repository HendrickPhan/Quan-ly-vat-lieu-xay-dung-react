import {
  FETCH_VENDOR_BEGIN,
  FETCH_VENDOR_SUCCESS,
  FETCH_VENDOR_FAILURE,
  EDIT_VENDOR_SUCCESS,
  EDIT_VENDOR_FAILURE,
  RESET_FORM,
} from './VendorFormActions';


const initialState = {
  vendor: {
    id: null,
    name: '',
    address: '',
    phone: '',
  },
  fetching: false,
  fetched: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_VENDOR_BEGIN:
      return {
        ...state,
        fetching: true,
        fetched: false,
      };
    case FETCH_VENDOR_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        vendor: action.vendor
      };

    case FETCH_VENDOR_FAILURE:
      return {
        ...state,
        error: action.error
      };
    
    case EDIT_VENDOR_SUCCESS:
      return {
        ...state,
        fetching: true,
      };
    
    case RESET_FORM:
      return initialState;
    
    case EDIT_VENDOR_FAILURE:
        return {
          ...state,
          fetching: true,
        };
  
    default:
      return state;
  }
}
