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

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/category",
    name: "Loại Sản Phẩm",
    icon: "shop_two",
    component: Category,
    layout: "/admin",
    display: true,
    exact: true
  },
  {
    path: "/category/:id",
    name: "Form Loại Sản Phẩm",
    icon: "content_paste",
    component: CategoryForm,
    layout: "/admin",
    display: false,
    exact: false
  },
  {
    path: "/product",
    name: "Sản Phẩm",
    icon: "content_paste",
    component: Product,
    layout: "/admin",
    display: true,
    exact: true
  },
  {
    path: "/product/:id",
    name: "Form Sản Phẩm",
    icon: "content_paste",
    component: ProductForm,
    layout: "/admin",
    display: false,
    exact: false
  },
  {
    path: "/angency",
    name: "Đại Lý",
    icon: "content_paste",
    component: Agency,
    layout: "/admin",
    display: true,
    exact: true
  },
  {
    path: "/angency/:id",
    name: "Form Đại Lý",
    icon: "content_paste",
    component: AgencyForm,
    layout: "/admin",
    display: false,
    exact: false
  },
  {
    path: "/customer",
    name: "Khách Hàng",
    icon: "content_paste",
    component: Customer,
    layout: "/admin",
    display: true,
    exact: true
  },
  {
    path: "/customer/:id",
    name: "Form Khách Hàng",
    icon: "content_paste",
    component: CustomerForm,
    layout: "/admin",
    display: false,
    exact: false
  },
  {
    path: "/vendor",
    name: "Nhà Cung Cấp",
    icon: "content_paste",
    component: Vendor,
    layout: "/admin",
    display: true,
    exact: true
  },
  {
    path: "/vendor/:id",
    name: "Form Nhà Cung Cấp",
    icon: "content_paste",
    component: VendorForm,
    layout: "/admin",
    display: false,
    exact: false
  },  
  {
    path: "/user",
    name: "Nhân Viên",
    icon: "content_paste",
    component: User,
    layout: "/admin",
    display: true,
    exact: true
  },
  {
    path: "/user/:id",
    name: "Form Nhân Viên",
    icon: "content_paste",
    component: UserForm,
    layout: "/admin",
    display: false,
    exact: false
  },
];

export default dashboardRoutes;
