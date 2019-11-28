import {
  FETCH_VENDORS_BEGIN,
  FETCH_VENDORS_SUCCESS,
  FETCH_VENDORS_FAILURE,
  CHANGE_PER_PAGE,
  DELETE_VENDOR
} from './VendorActions';


const initialState = {
  vendors: [],
  fetching: false,
  fetched: false,
  currentPage: 1,
  totalRows: 0,
  perPage: 10
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_VENDORS_BEGIN:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_VENDORS_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        vendors: action.vendors.data,
        currentPage: Number(action.vendors.current_page),
        totalRows: Number(action.vendors.total),
        perPage: Number(action.vendors.per_page)
      };

    case FETCH_VENDORS_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case CHANGE_PER_PAGE:
      return {
        ...state,
        perPage: action.perPage
      };

    case DELETE_VENDOR:
      return {
        ...state,
        vendors: state.vendors.filter(vendor => vendor.id !== action.id)
      };
  
    default:
      return state;
  }
}
