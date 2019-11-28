import {
  LOGGING_IN,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE
} from './LoginActions';


const initialState = {
  userInfo: localStorage.getItem('user_info'),
  fetching: false,
  fetched: false,
  loggedIn: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGGING_IN:
      return {
        ...state,
        fetching: true,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        fetched: true,
        loggedIn: true,
        userInfo: action.userInfo,
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        fetched: true,
        loggedIn: false,
        error: action.error
      };
    default:
      return state;
  }
}
