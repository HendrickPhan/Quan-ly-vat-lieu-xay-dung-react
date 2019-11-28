import {
  FETCH_AGENCY_BEGIN,
  FETCH_AGENCY_SUCCESS,
  FETCH_AGENCY_FAILURE,
  EDIT_AGENCY_SUCCESS,
  EDIT_AGENCY_FAILURE,
  RESET_FORM,
} from './AgencyFormActions';


const initialState = {
  agency: {
    id: null,
    name: '',
    address: '',
    phone: '',
  },
  fetching: false,
  fetched: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_AGENCY_BEGIN:
      return {
        ...state,
        fetching: true,
        fetched: false,
      };
    case FETCH_AGENCY_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        agency: action.agency
      };

    case FETCH_AGENCY_FAILURE:
      return {
        ...state,
        error: action.error
      };
    
    case EDIT_AGENCY_SUCCESS:
      return {
        ...state,
        fetching: true,
      };
    
    case RESET_FORM:
      return initialState;
    
    case EDIT_AGENCY_FAILURE:
        return {
          ...state,
          fetching: true,
        };
  
    default:
      return state;
  }
}
