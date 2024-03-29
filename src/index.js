
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import store from './store';


// core components
import Admin from "layouts/Admin.js";
import Login from "views/Login/Login.js"

import SwitchRoutes from "./components/SwitchRoutes/SwitchRoutes.js"

import "assets/css/material-dashboard-react.css?v=1.8.0";
import 'bootstrap/dist/css/bootstrap.min.css';

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store()}>
    <Router history={hist}>
      <SwitchRoutes/>
    </Router>
  </Provider>,
  document.getElementById("root")
);
