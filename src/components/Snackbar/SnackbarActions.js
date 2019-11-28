export const UPDATE_PROPS = 'UPDATE_PROPS';
export const OPEN_SNACK = 'OPEN_SNACK';
export const CLOSE_SNACK = 'CLOSE_SNACK';

export const updateProps = props => ({
  type: UPDATE_PROPS,
  props
});

export const openSnack = () => ({
  type: OPEN_SNACK
});

export const closeSnack = () => ({
  type: CLOSE_SNACK
});

export const displayMessage = (message, color, timeout) => {
  return dispatch => {
    dispatch(updateProps({message:message, color:color}));
    dispatch(openSnack());
    setTimeout(
      ()=>{
        dispatch(closeSnack())
      }
    , timeout);
  };
};

