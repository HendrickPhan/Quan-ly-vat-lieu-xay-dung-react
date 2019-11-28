import {
  FETCH_USERS_BEGIN,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  CHANGE_PER_PAGE,
  DELETE_USER
} from './UserActions';


const initialState = {
  users: [],
  fetching: false,
  fetched: false,
  currentPage: 1,
  totalRows: 0,
  perPage: 10
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_BEGIN:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        users: action.users.data,
        currentPage: Number(action.users.current_page),
        totalRows: Number(action.users.total),
        perPage: Number(action.users.per_page)
      };

    case FETCH_USERS_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case CHANGE_PER_PAGE:
      return {
        ...state,
        perPage: action.perPage
      };

    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(customer => customer.id !== action.id)
      };
  
    default:
      return state;
  }
}
