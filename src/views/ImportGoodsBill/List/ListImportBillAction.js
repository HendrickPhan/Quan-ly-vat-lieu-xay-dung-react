import { displayMessage } from '../../../components/Snackbar/SnackbarActions';

export const FETCH_LIST_IMPORT_BILL_BEGIN = 'FETCH_LIST_IMPORT_BILL_BEGIN';
export const FETCH_LIST_IMPORT_BILL_SUCCESS = 'FETCH_LIST_IMPORT_BILL_SUCCESS';
export const FETCH_LIST_IMPORT_BILL_FAILURE = 'FETCH_LIST_IMPORT_BILL_FAILURE';
export const GET_USER_ROLE_SUCCESS = 'GET_USER_ROLE_SUCCESS';
export const GET_USER_ROLE_FAILURE = 'GET_USER_ROLE__FAILURE';
export const BUSSINESS_STAFF = 4;
export const WAREHOUSE_STAFF = 5;
export const ADMIN_USER = 0;
export const CHANGE_PER_PAGE = 'CHANGE_PER_PAGE';

var token = "";
if(JSON.parse(localStorage.getItem('user_info'))) {
  token = "Bearer " + JSON.parse(localStorage.getItem('user_info')).token;
}
const fetchImportBillSuccess = importBills => ({
  type: FETCH_LIST_IMPORT_BILL_SUCCESS,
  importBills
});

const getUserRoleFailure = error => ({
  type: GET_USER_ROLE_FAILURE,
  error
});

const getUserRoleSuccess = userRole => ({
  type: GET_USER_ROLE_SUCCESS,
  userRole
});

const fetchImportBillFailure = error => ({
  type: FETCH_LIST_IMPORT_BILL_FAILURE,
  error
});


export const getUserRole = () => {
  return dispatch => {
    return _getUserRole()
      .then(user => {
        dispatch(getUserRoleSuccess(user.role));
        return user.role;
      })
      .catch(error =>
        dispatch(getUserRoleFailure(error))
      );
  };
}

const _getUserRole = () => {
  const requestOptions = {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': token
    },
  };

  return fetch(process.env.REACT_APP_API_URL + `/user/infor`, requestOptions)
    .then(handleResponse)
    .then(user => {
      return user;
    });
}


export const fetchImportBills = (page, perPage) => {
    return dispatch => {
      return _getImportBills(page, perPage)
        .then(importBills => {  
          dispatch(fetchImportBillSuccess(importBills));
            return importBills;
        })
        .catch(error =>
          dispatch(fetchImportBillFailure(error))
        );
    };
  }

const _getImportBills = (page, perPage) => {
const requestOptions = {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': token
    },
};

return fetch(process.env.REACT_APP_API_URL + `/import-goods-bill/list?page=` + page + '&limit=' + perPage, requestOptions)
    .then(handleResponse)
    .then(importBillList => {
      return importBillList;
    });
}

export const changePerPage = (perPage) => {
    return dispatch => {
      dispatch(fetchPerPage(perPage)); 
      dispatch(fetchImportBills(1, perPage));
    };
}

  const fetchPerPage = (perPage) => ({
    type: CHANGE_PER_PAGE,
    perPage
  })
  

const handleResponse = (response) => {
    return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      return data;
    })
  }
  