export const GET_BIIL_INFOR_SUCCESS = 'FETCH_BILL_INFOR_SUCCESS';
export const GET_BILL_INFOR_FAILURE  = 'FETCH_BILL_INFOR_FAILURE';

export const fetchBillInforSuccess = bill_infor => ({
    type: GET_BIIL_INFOR_SUCCESS,
    bill_infor
});

export const fetchBillInforFailure = error => ({
    type: FETCH_BILL_INFOR_FAILURE,
    error,
});


