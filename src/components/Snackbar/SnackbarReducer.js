import {
  UPDATE_PROPS,
  OPEN_SNACK,
  CLOSE_SNACK,
} from './SnackbarActions';

const initialState = {
  message: '',
  color: 'info',
  close: true,
  icon: undefined,
  open: false,
  place: 'tr',
  closeNotification: ()=>{}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_PROPS:
      return {
        ...state,
        ...action.props
      };
    case OPEN_SNACK:
      return {
        ...state,
        open: true,
      };

    case CLOSE_SNACK:
      return {
        ...state,
        open: false,
      };
  
    default:
      return state;
  }
}
