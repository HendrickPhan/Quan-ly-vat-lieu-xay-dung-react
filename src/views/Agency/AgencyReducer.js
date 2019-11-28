import {
  FETCH_AGENCIES_BEGIN,
  FETCH_AGENCIES_SUCCESS,
  FETCH_AGENCIES_FAILURE,
  CHANGE_PER_PAGE,
  DELETE_AGENCY
} from './AgencyActions';


const initialState = {
  agencies: [],
  fetching: false,
  fetched: false,
  currentPage: 1,
  totalRows: 0,
  perPage: 10
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_AGENCIES_BEGIN:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_AGENCIES_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        agencies: action.agencies.data,
        currentPage: Number(action.agencies.current_page),
        totalRows: Number(action.agencies.total),
        perPage: Number(action.agencies.per_page)
      };

    case FETCH_AGENCIES_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case CHANGE_PER_PAGE:
      return {
        ...state,
        perPage: action.perPage
      };

    case DELETE_AGENCY:
      return {
        ...state,
        agencies: state.agencies.filter(agency => agency.id !== action.id)
      };
  
    default:
      return state;
  }
}
