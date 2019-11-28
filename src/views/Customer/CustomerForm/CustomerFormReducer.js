import {
  FETCH_CUSTOMER_BEGIN,
  FETCH_CUSTOMER_SUCCESS,
  FETCH_CUSTOMER_FAILURE,
  EDIT_CUSTOMER_SUCCESS,
  EDIT_CUSTOMER_FAILURE,
  RESET_FORM,
} from './CustomerFormActions';


const initialState = {
  customer: {
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
    case FETCH_CUSTOMER_BEGIN:
      return {
        ...state,
        fetching: true,
        fetched: false,
      };
    case FETCH_CUSTOMER_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        customer: action.customer
      };

    case FETCH_CUSTOMER_FAILURE:
      console.log(action.error)
      return {
        ...state,
        error: action.error
      };
    
    case EDIT_CUSTOMER_SUCCESS:
      return {
        ...state,
        fetching: true,
      };
    
    case RESET_FORM:
      return initialState;
    
    case EDIT_CUSTOMER_FAILURE:
        return {
          ...state,
          fetching: true,
        };
  
    default:
      return state;
  }
}
