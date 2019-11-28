import { displayMessage } from '../../components/Snackbar/SnackbarActions.js';
import AgencyManagerRoutes from "routes/AgencyManagerRoutes.js";
import AdminRoutes from "routes/AdminRoutes.js";

export const LOGGING_IN = 'LOGGING_IN';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const loggingIn = () => ({
  type: LOGGING_IN
});

export const logInSuccess = userInfo => ({
  type: LOG_IN_SUCCESS,
  userInfo
});

export const logInFailure = error => ({
  type: LOG_IN_FAILURE,
  error
});

export const loginUser = (email, password) => {
  logoutUser();
  return dispatch => {
    dispatch(loggingIn());
    return _loginUser(email, password)
      .then(userInfo => {
        dispatch(logInSuccess(userInfo));
        return userInfo;
      })
      .catch(status =>{
        dispatch(logInFailure(status));
        if (status === 422) {
          dispatch(displayMessage('Không đúng định dạng email', 'danger', 3000));
        }
        if (status === 401) {
          dispatch(displayMessage('Sai email hoặc password', 'danger', 3000));
        }
      }
    );
  };
}

const _loginUser = (email, password) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ email, password })
  };

  return fetch(process.env.REACT_APP_API_URL + `/auth/login`, requestOptions)
    .then(handleResponse)
    .then(userInfo => {
      localStorage.setItem('user_info', JSON.stringify(userInfo));
      return userInfo;
    })
}

export const logoutUser = () => {
  localStorage.removeItem('user_infor');
}

const handleResponse = (response) => {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      logoutUser();
      return Promise.reject(response.status);
    }
    return data;
  })
}
