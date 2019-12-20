import { displayMessage } from '../../../components/Snackbar/SnackbarActions.js';

export const FETCH_USER_BEGIN = 'FETCH_USER_BEGIN';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILURE = 'EDIT_USER_FAILURE';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';                                     
export const FETCH_USER_FORM_AGENCY_BEGIN = 'FETCH_USER_FORM_AGENCY_BEGIN';
export const FETCH_USER_FORM_AGENCY_SUCCESS = 'FETCH_USER_FORM_AGENCY_SUCCESS';
export const FETCH_USER_FORM_AGENCY_FAILURE = 'FETCH_USER_FORM_AGENCY_FAILURE';
export const RESET_FORM = 'RESET_FORM';

var token = "";
if(JSON.parse(localStorage.getItem('user_info'))) {
  token = "Bearer " + JSON.parse(localStorage.getItem('user_info')).token;
}
export const fetchUserBegin = () => ({
  type: FETCH_USER_BEGIN
});

export const fetchUserSuccess = user => ({
  type: FETCH_USER_SUCCESS,
  user
});

export const fetchUserFailure = error => ({
  type: FETCH_USER_FAILURE,
  error
});

export const editUserSuccess = user => ({
  type: EDIT_USER_SUCCESS,
  user
});

export const editUserFailure = error => ({
  type: EDIT_USER_FAILURE,
  error
});

export const addUserSuccess = user => ({
  type: ADD_USER_SUCCESS,
  user
});

export const addUserFailure = error => ({
  type: ADD_USER_FAILURE,
  error
});

export const fetchAgencyBegin = () => ({
  type: FETCH_USER_FORM_AGENCY_BEGIN
});

export const fetchAgencySuccess = agencies => ({
  type: FETCH_USER_FORM_AGENCY_SUCCESS,
  agencies
});

export const fetchAgencyFailure = error => ({
  type: FETCH_USER_FORM_AGENCY_FAILURE,
  error
});

export const resetForm = () => ({
  type: RESET_FORM
});

export const reset = () => {
  return dispatch => {
    dispatch(resetForm());
  }
}

export const fetchAgency = () => {
  return dispatch => {
    dispatch(fetchAgencyBegin());
    return _getAgencyList()
      .then(agencies => {
        dispatch(fetchAgencySuccess(agencies));
        return agencies;
      })
      .catch(error =>
        dispatch(fetchAgencyFailure(error))
      );
  };
}

export const fetchUser = (id) => {
  return dispatch => {
    dispatch(fetchUserBegin());
    return _getUser(id)
      .then(user => {
        dispatch(fetchUserSuccess(user));
        return user;
      })
      .catch(error =>
        dispatch(fetchUserFailure(error))
      );
  };
}

export const editUser = (id, data) => {
  return dispatch => {
    dispatch(fetchUserBegin());
    return _editUser(id, data)
      .then(user => {
        dispatch(editUserSuccess(user));
        return user;
      })
      .then(user => {
        dispatch(fetchUser(user.id));
      })
      .then(()=>{
        dispatch(displayMessage('Cập nhập thành công', 'success', 3000));
      })
      .catch(error =>
        dispatch(editUserFailure(error))
      );
  };
}

export const addUser = (data) => {
  return dispatch => {
    return _addUser(data)
      .then(user => {
        dispatch(addUserSuccess(user));
        return user;
      })
      .then((user)=>{
        dispatch(displayMessage('Thêm thành công', 'success', 3000));
        return user;
      })
      .catch(error =>{
        dispatch(addUserFailure(error))
      });
  };
}

const _getUser = (id) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
  };
  return fetch(process.env.REACT_APP_API_URL + `/user/` + id, requestOptions)
    .then(handleResponse)
    .then(user => {
      let formatedUser = user;
      formatedUser.fetchedAvatar = user.avatar; 
      formatedUser.avatar = null;
      return formatedUser;
    });
}

const _editUser = (id, data) => {
  let formData = new FormData();
  formData.append("_method", "PUT");
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("role", data.role);
  formData.append("phone", data.phone);
  
  if(data.password){
    formData.append("password", data.password);
  }
  if(data.avatar){
    formData.append("avatar", data.avatar[0]);
  }

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': token
    },
    body: formData
  };

  return fetch(process.env.REACT_APP_API_URL + `/user/` + id, requestOptions)
    .then(handleResponse)
    .then(user => {
      return user;
    });
}

const _addUser= (data) => {
  let formData = new FormData();
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("address", data.address);
  formData.append("role", data.role);
  formData.append("phone", data.phone);
  if(data.password){
    formData.append("password", data.password);
  }
  if(data.avatar){
    formData.append("avatar", data.avatar[0]);
  }

  const requestOptions = {
    
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': token
    },
    body: formData
  };

  return fetch(process.env.REACT_APP_API_URL + `/user`, requestOptions)
    .then(handleResponse)
    .then(user => {
      console.log('here', user);
      return user;
    });
}

const _getAgencyList = () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
  };

  return fetch(process.env.REACT_APP_API_URL + `/agency/get-list`, requestOptions)
    .then(handleResponse)
    .then(agencies => {
      // let formatedProduct = product;
      // formatedProduct.fetchedImages = product.images; 
      // formatedProduct.images = [];
      //console.log(agencies.agencies);
      return agencies.agencies;
    });
}


const handleResponse = (response) => {
  
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
     
      console.log('ERR');
      return Promise.reject(error);
    }

    return data;
  })
}
