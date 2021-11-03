import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import AdminLayout from "layouts/core/Admin/Admin.js";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-notification-alert/dist/animate.css";

import ThemeContextWrapper from "./components/core/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/core/BackgroundColorWrapper/BackgroundColorWrapper";
import { Login } from './layouts/app/Login';
import { Register } from "layouts/app/Register";

ReactDOM.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <BrowserRouter>
        <Switch>
          <Route path="/admin" render={(props) => <AdminLayout />} />
          <Route path="/Login" render={(props) => <Login />} />
          <Route path="/Register" render={(props) => <Register />} />
          <Redirect from="/" to="/Login" />
        </Switch>
      </BrowserRouter>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>,
  document.getElementById("root")
);
