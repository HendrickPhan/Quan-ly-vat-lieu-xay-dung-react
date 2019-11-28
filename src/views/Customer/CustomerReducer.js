import {
  FETCH_CUSTOMERS_BEGIN,
  FETCH_CUSTOMERS_SUCCESS,
  FETCH_CUSTOMERS_FAILURE,
  CHANGE_PER_PAGE,
  DELETE_CUSTOMER
} from './CustomerActions';


const initialState = {
  customers: [],
  fetching: false,
  fetched: false,
  currentPage: 1,
  totalRows: 0,
  perPage: 10
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_CUSTOMERS_BEGIN:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_CUSTOMERS_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        customers: action.customers.data,
        currentPage: Number(action.customers.current_page),
        totalRows: Number(action.customers.total),
        perPage: Number(action.customers.per_page)
      };

    case FETCH_CUSTOMERS_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case CHANGE_PER_PAGE:
      return {
        ...state,
        perPage: action.perPage
      };

    case DELETE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.filter(customer => customer.id !== action.id)
      };
  
    default:
      return state;
  }
}
