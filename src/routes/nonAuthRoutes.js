import React, {lazy} from "react";
import { Redirect, Route } from "react-router-dom";
import { authCheck } from "../utils/authHelper";

import NonAuthLayout from "../layout/NonAuthLayout";

const Login = lazy(() => import("../pages/login/Login"));
const ForgotPassword = lazy(() => import("../pages/forgotPassword/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/resetPassword/ResetPassword"));

const routes = [
  {
    path: "/login",
    component: <Login />,
  },
  {
    path: "/forgot-password",
    component: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    component: <ResetPassword />,
  },
];

export default routes.map((route, index) => (
  <Route
    exact
    key={index}
    path={route.path}
    render={() =>
      authCheck() === true ? (
        <Redirect to="/dashboard" />
      ) : (
        <NonAuthLayout>{route.component}</NonAuthLayout>
      )
    }
  />
));
