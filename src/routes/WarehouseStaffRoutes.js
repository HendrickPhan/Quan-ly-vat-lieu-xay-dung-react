/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import UserIcon from "@material-ui/icons/Person";

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";

import Category from "views/Category/Category.js";
import CategoryForm from "views/Category/CategoryForm/CategoryForm.js";
import Product from "views/Product/Product.js"
import ProductForm from "views/Product/ProductForm/ProductForm.js"
import Agency from "views/Agency/Agency.js"
import AgencyForm from "views/Agency/AgencyForm/AgencyForm.js"
import Customer from 'views/Customer/Customer.js';
import CustomerForm from 'views/Customer/CustomerForm/CustomerForm.js';
import Vendor from 'views/Vendor/Vendor.js';
import VendorForm from 'views/Vendor/VendorForm/VendorForm.js';
import User from 'views/User/User.js';
import UserForm from 'views/User/UserForm/UserForm.js';
import SellingBillList from 'views/SellingBill/SellingList/SellingList'

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/selling-bill",
    name: "Hóa đơn bán hàng",
    icon: "content_paste",
    component: SellingBillList,
    layout: "/admin",
    display: true,
    exact: true
  },
];

export default dashboardRoutes;
