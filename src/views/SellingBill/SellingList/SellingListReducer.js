import {
    FETCH_LIST_SELLING_BILL_FAILURE,
    FETCH_LIST_SELLING_BILL_SUCCESS,
    FETCH_LIST_SELLING_BILL_BEGIN,
    CHANGE_PER_PAGE,
    WAREHOUSE_STAFF,
    ADMIN_USER,
    BUSSINESS_STAFF,
    GET_USER_ROLE_SUCCESS,
    GET_USER_ROLE_FAILURE,

  } from './SellingListAction';
  
  
  const initialState = {
    sellingBills: [],
    fetching: false,
    fetched: false,
    currentPage: 1,
    totalRows: 0,
    perPage: 10,
    userRole: 0
  };
  const fetchPerPage = (perPage) => ({
    type: CHANGE_PER_PAGE,
    perPage
  })

  export default function (state = initialState, action) {
    switch (action.type) {
      case FETCH_LIST_SELLING_BILL_BEGIN:
        return {
          ...state,
          fetching: true,
        };
      case FETCH_LIST_SELLING_BILL_SUCCESS:
        return {
          ...state,
          fetching: false,
          fetched: true,
          sellingBills: action.sellingBills.data,
          currentPage: Number(action.sellingBills.current_page),
          totalRows: Number(action.sellingBills.total),
          perPage: Number(action.sellingBills.per_page)
        };
      case GET_USER_ROLE_SUCCESS:
        return {
          ...state,
          fetching: false,
          fetched: true,
          userRole: action.userRole,
        };  
      case GET_USER_ROLE_FAILURE:
        return {
          ...state,
          error: action.error
        };
      case FETCH_LIST_SELLING_BILL_FAILURE:
        return {
          ...state,
          error: action.error
        };
  
      case CHANGE_PER_PAGE:
        return {
          ...state,
          perPage: action.perPage
        };
      default:
        return state;
    }
  }