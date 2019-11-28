import { combineReducers } from 'redux';
import LoginReducer from './views/Login/LoginReducer'
import SnackbarReducer from './components/Snackbar/SnackbarReducer.js';
import CategoryReducer from './views/Category/CategoryReducer.js';
import CategoryFormReducer from './views/Category/CategoryForm/CategoryFormReducer.js';
import ProductReducer from './views/Product/ProductReducer.js';
import ProductFormReducer from './views/Product/ProductForm/ProductFormReducer.js';
import AgencyReducer from './views/Agency/AgencyReducer';
import AgencyFormReducer from './views/Agency/AgencyForm/AgencyFormReducer';
import CustomerReducer from './views/Customer/CustomerReducer';
import CustomerFormReducer from './views/Customer/CustomerForm/CustomerFormReducer';
import VendorReducer from './views/Vendor/VendorReducer';
import VendorFormReducer from './views/Vendor/VendorForm/VendorFormReducer';
import UserReducer from './views/User/UserReducer';
import UserFormReducer from './views/User/UserForm/UserFormReducer';
import SellingBillFormReducer from './views/SellingBill/SellingBillForm/SellingBillFormReducer';

export default combineReducers({
    login: LoginReducer,
    snackbar: SnackbarReducer,
    
    category: CategoryReducer,
    categoryForm: CategoryFormReducer,
    
    product: ProductReducer,
    productForm: ProductFormReducer,

    agency: AgencyReducer,
    agencyForm: AgencyFormReducer,

    customer: CustomerReducer,
    customerForm: CustomerFormReducer,

    vendor: VendorReducer,
    vendorForm: VendorFormReducer,

    user: UserReducer,
    userForm: UserFormReducer,

    sellingBillForm: SellingBillFormReducer
});

