import {
  FETCH_USER_BEGIN,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_USER_FORM_AGENCY_BEGIN,
  FETCH_USER_FORM_AGENCY_SUCCESS,
  FETCH_USER_FORM_AGENCY_FAILURE,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE,
  RESET_FORM,
} from './UserFormActions';


const initialState = {
  user: {
    id: null,
    name: '',
    address: '',
    phone: '',
    role: 0,
    password: ''
  },
  retype_psw: '',
  agencies:[],
  fetching: false,
  fetched: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_BEGIN:
      return {
        ...state,
        fetching: true,
        fetched: false,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        user: action.user
      };

    case FETCH_USER_FAILURE:
      console.log(action.error)
      return {
        ...state,
        error: action.error
      };
    
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        fetching: true,
      };
    
    case RESET_FORM:
      return initialState;
    
    case EDIT_USER_FAILURE:
        return {
          ...state,
          fetching: true,
        };
    case FETCH_USER_FORM_AGENCY_BEGIN:
      return {
        ...state,
        fetching: true,
        fetched: false,
      };
    case FETCH_USER_FORM_AGENCY_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        agencies: action.agencies
      };

    case FETCH_USER_FORM_AGENCY_FAILURE:
      console.log(action.error)
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}
