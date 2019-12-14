import {
    FETCH_IMPORT_BILL_PRODUCTS_SUCCESS,
    FETCH_IMPORT_BILL_PRODUCTS_FAILURE,
    FETCH_IMPORT_BILL_CATEGORIES_SUCCESS,
    FETCH_IMPORT_BILL_CATEGORIES_FAILURE,
    FETCH_IMPORT_BILL_VENDORS_SUCCESS,
    FETCH_IMPORT_BILL_VENDORS_FAILURE,
    ADD_IMPORT_BILL_SUCCESS,
    ADD_IMPORT_BILL_FAILURE,
    RESET_FORM,
  } from './ImportGoodsBillAction';
  
  
  const initialState = {
    importBillDetail: [], //[{product_id: , quantity: }]
    products: [],
    vendors: [],
    categories: [],
    currentCategory: {},
    vendor_id: 0,
    productListCurrentPage: 1,
    productListTotalRows: 0,
    productListPerPage: 30,
    step: 1,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case FETCH_IMPORT_BILL_PRODUCTS_SUCCESS:
        return {
          ...state,
          products: action.products.data,
          productListCurrentPage: Number(action.products.current_page),
          productListTotalRows: Number(action.products.total),
          productListPerPage: Number(action.products.per_page)
        };

      case FETCH_IMPORT_BILL_CATEGORIES_SUCCESS:
        return {
          ...state,
          categories: action.categories
        };

      case FETCH_IMPORT_BILL_VENDORS_SUCCESS:
        return {
          ...state,
          fetching: false,
          fetched: true,
          vendors: action.vendors
        };

      case FETCH_IMPORT_BILL_VENDORS_FAILURE:
        return {
          ...state,
          error: action.error
        };

      case ADD_IMPORT_BILL_SUCCESS:
        return {
          ...state,
          fetching: false,
          fetched: true,
          importBillDetail: action.importBillDetail
        };

      case ADD_IMPORT_BILL_FAILURE:
        return {
          ...state,
          error: action.error
        };
      case RESET_FORM:
        return initialState;
      
      default:
        return state;
    }
  }
  