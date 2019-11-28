import {
  FETCH_CATEGORY_BEGIN,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_FAILURE,
  FETCH_CATEGORY_SELECT_LIST_SUCCESS,
  FETCH_CATEGORY_SELECT_LIST_FAILURE,
  EDIT_CATEGORY_SUCCESS,
  EDIT_CATEGORY_FAILURE,
  RESET_FORM,
} from './CategoryFormActions';


const initialState = {
  category: [],
  categorySelectList: [],
  fetching: false,
  fetched: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORY_BEGIN:
      return {
        ...state,
        fetching: true,
        fetched: false,
      };
    case FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        category: action.category
      };

    case FETCH_CATEGORY_FAILURE:
      return {
        ...state,
        error: action.error
      };
    
    case FETCH_CATEGORY_SELECT_LIST_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        categorySelectList: action.categorySelectList
      };

    case FETCH_CATEGORY_SELECT_LIST_FAILURE:
      return {
        ...state,
        error: action.error
      };
    
    case EDIT_CATEGORY_SUCCESS:
      return {
        ...state,
        fetching: true,
      };
    
    case RESET_FORM:
      return initialState;
    
    case EDIT_CATEGORY_FAILURE:
        return {
          ...state,
          fetching: true,
        };
  
    default:
      return state;
  }
}
