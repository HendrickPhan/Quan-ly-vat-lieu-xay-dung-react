import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  CHANGE_PER_PAGE,
  DELETE_PRODUCT
} from './ProductActions';


const initialState = {
  products: [],
  fetching: false,
  fetched: false,
  currentPage: 1,
  totalRows: 0,
  perPage: 10
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_BEGIN:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_PRODUCTS_SUCCESS:
      console.log('action', action);
      return {
        ...state,
        fetching: false,
        fetched: true,
        products: action.products.data,
        currentPage: Number(action.products.current_page),
        totalRows: Number(action.products.total),
        perPage: Number(action.products.per_page)
      };

    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case CHANGE_PER_PAGE:
      return {
        ...state,
        perPage: action.perPage
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(category => category.id !== action.id)
      };
  
    default:
      return state;
  }
}
