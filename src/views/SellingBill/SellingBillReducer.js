import {
    FETCH_SELLING_BILL_PRODUCTS_SUCCESS,
    FETCH_SELLING_BILL_PRODUCTS_FAILURE,
    FETCH_SELLING_BILL_CATEGORIES_SUCCESS,
    FETCH_SELLING_BILL_CATEGORIES_FAILURE,
    FETCH_SELLING_BILL_CUSTOMERS_FAILURE,
    FETCH_SELLING_BILL_CUSTOMERS_SUCCESS,
    FETCH_SELLING_BILL_CUSTOMERS_BEGIN,
    ADD_SELLING_BILL_SUCCESS,
    ADD_SELLING_BILL_FAILURE,
    RESET_FORM,
  } from './SellingBillAction';
  
  
  const initialState = {
    sellingBillDetail: [], //[{product_id: , quantity: }]
    products: [],
    categories: [],
    customers: [],
    currentCustomer: {},
    currentCategory: {},
    productListCurrentPage: 1,
    productListTotalRows: 0,
    productListPerPage: 30,
    step: 1,
    totalBill: 0,
    totalPaid: 0,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case FETCH_SELLING_BILL_PRODUCTS_SUCCESS:
        return {
          ...state,
          products: action.products.data,
          productListCurrentPage: Number(action.products.current_page),
          productListTotalRows: Number(action.products.total),
          productListPerPage: Number(action.products.per_page)
        };
      case FETCH_SELLING_BILL_CATEGORIES_SUCCESS:
        return {
          ...state,
          categories: action.categories
        };
      case FETCH_SELLING_BILL_CUSTOMERS_SUCCESS:
        return {
          ...state,
          customers: action.customers
        };
      case ADD_SELLING_BILL_SUCCESS:
        return {
          ...state,
          fetching: false,
          fetched: true,
          sellingBillDetail: action.sellingBillDetail
        };
  
      case ADD_SELLING_BILL_FAILURE:
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
  