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

import SellingBillList from 'views/SellingBill/SellingList/SellingList'
import ListImportBill from 'views/ImportGoodsBill/List/ListImportBill.js'
import ImportBillDetail from 'views/ImportGoodsBill/Detail/ImportBillDetail.js';
import SellingBillDetail from 'views/SellingBill/SellingBillDetail/SellingBillDetail.js';

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
  {
    path: "/selling-bill/:id",
    name: "Chi tiết hóa đơn bán hàng",
    icon: "content_paste",
    component: SellingBillDetail,
    layout: "/admin",
    display: false,
    exact: true
  },
  {
    path: "/import-bill",
    name: "Hóa đơn nhập hàng",
    icon: "content_paste",
    component: ListImportBill,
    layout: "/admin",
    display: true,
    exact: true
  },
  {
    path: "/import-bill/:id",
    name: "Chi tiết hóa đơn nhập hàng",
    icon: "content_paste",
    component: ImportBillDetail,
    layout: "/admin",
    display: false,
    exact: true
  },
  
];

export default dashboardRoutes;
