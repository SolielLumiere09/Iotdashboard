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
import { AuthContextProvider } from "contexts/app/AuthContext";
import { MiddlewareValidator } from "components/app/MiddlewareValidator";
import { NotificationContext } from "contexts/app/NotificationContext";

ReactDOM.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <BrowserRouter>
        <AuthContextProvider>
          <NotificationContext>

          <MiddlewareValidator/>
            <Switch>
              <Route path="/admin" render={() => <AdminLayout />} />
              <Route path="/Login" render={() => <Login />} />
              <Route path="/Register" render={() => <Register />} />
              <Redirect from="/" to="/Login" />
            </Switch>


          </NotificationContext>
        </AuthContextProvider>
      </BrowserRouter>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>,
  document.getElementById("root")
);
