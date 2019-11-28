import {
  FETCH_CATEGORIES_BEGIN,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  CHANGE_PER_PAGE,
  DELETE_CATEGORY
} from './CategoryActions';


const initialState = {
  categories: [],
  fetching: false,
  fetched: false,
  currentPage: 1,
  totalRows: 0,
  perPage: 10
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES_BEGIN:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        categories: action.categories.data,
        currentPage: Number(action.categories.current_page),
        totalRows: Number(action.categories.total),
        perPage: Number(action.categories.per_page)
      };

    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        error: action.payload.error
      };

    case CHANGE_PER_PAGE:
      return {
        ...state,
        perPage: action.perPage
      };

    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(category => category.id !== action.id)
      };
  
    default:
      return state;
  }
}
