import { displayMessage } from '../../../components/Snackbar/SnackbarActions';

export const FETCH_LIST_SELLING_BILL_BEGIN = 'FETCH_LIST_SELLING_BILL_BEGIN';
export const FETCH_LIST_SELLING_BILL_SUCCESS = 'FETCH_LIST_SELLING_BILL_SUCCESS';
export const FETCH_LIST_SELLING_BILL_FAILURE = 'FETCH_LIST_SELLING_BILL_FAILURE';
export const GET_USER_ROLE_SUCCESS = 'GET_USER_ROLE_SUCCESS';
export const GET_USER_ROLE_FAILURE = 'GET_USER_ROLE__FAILURE';
export const CHANGE_PER_PAGE = 'CHANGE_PER_PAGE';

var token = "";
if(JSON.parse(localStorage.getItem('user_info'))) {
  token = "Bearer " + JSON.parse(localStorage.getItem('user_info')).token;
}
const fetchSellingBillSuccess = sellingBills => ({
  type: FETCH_LIST_SELLING_BILL_SUCCESS,
  sellingBills
});

const getUserRoleFailure = error => ({
  type: GET_USER_ROLE_FAILURE,
  error
});

const getUserRoleSuccess = userRole => ({
  type: GET_USER_ROLE_SUCCESS,
  userRole
});

const fetchSellingBillFailure = error => ({
  type: FETCH_LIST_SELLING_BILL_FAILURE,
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


export const  fetchSellingBills = (page, perPage) => {
    return dispatch => {
      return _getSellingBills(page, perPage)
        .then(sellingBills => {
          dispatch(fetchSellingBillSuccess(sellingBills));
          return sellingBills;
        })
        .catch(error =>
          dispatch(fetchSellingBillFailure(error))
        );
    };
  }

const _getSellingBills = (page, perPage) => {
const requestOptions = {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': token
    },
};

return fetch(process.env.REACT_APP_API_URL + `/selling-bill?page=` + page + '&limit=' + perPage, requestOptions)
    .then(handleResponse)
    .then(sellingBillList => {
    return sellingBillList;
    });
}

export const changePerPage = (perPage) => {
    return dispatch => {
      dispatch(fetchPerPage(perPage)); 
      dispatch(fetchSellingBills(1, perPage));
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
  