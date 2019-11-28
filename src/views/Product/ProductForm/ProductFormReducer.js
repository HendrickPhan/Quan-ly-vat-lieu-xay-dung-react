import {
  FETCH_PRODUCT_BEGIN,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  FETCH_PRODUCT_SELECT_LIST_SUCCESS,
  FETCH_PRODUCT_SELECT_LIST_FAILURE,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAILURE,
  RESET_FORM,
} from './ProductFormActions';


const initialState = {
  product: {
    id: null,
    name: null,
    price: null,
    unit: null,
    categories: [],
    images: [],
    fetchedImages: [],
  },
  deleteImages: [],
  productSelectList: [],
  fetching: false,
  fetched: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCT_BEGIN:
      return {
        ...state,
        fetching: true,
        fetched: false,
      };
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        product: action.product
      };

    case FETCH_PRODUCT_FAILURE:
      return {
        ...state,
        error: action.error
      };
    
    case FETCH_PRODUCT_SELECT_LIST_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        productSelectList: action.productSelectList
      };

    case FETCH_PRODUCT_SELECT_LIST_FAILURE:
      return {
        ...state,
        error: action.error
      };
    
    case EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        fetching: true,
      };
    
    case RESET_FORM:
      return initialState;
    
    case EDIT_PRODUCT_FAILURE:
        return {
          ...state,
          fetching: true,
        };
  
    default:
      return state;
  }
}
