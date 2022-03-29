import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { store } from "./store";
import { BrowserRouter, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import * as serviceWorker from "./serviceWorker";

import "./index.scss";

import AuthRoutes from "./routes/authRoutes";
import NonAuthRoutes from "./routes/nonAuthRoutes";
import GeneralRoutes from "./routes/generalRoutes";

import PreLoader from "./components/layout/preloader/PreLoader";

const defaultPreLoader = document.getElementById('defaultPreLoader');

if (defaultPreLoader) {
  defaultPreLoader.setAttribute('transition', "max-height 0.15s ease-out");
  // defaultPreLoader.style.transition = "max-height 0.15s ease-out";
  defaultPreLoader.remove();
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer />
        <Suspense fallback={<PreLoader />}>
          <Switch>
            {AuthRoutes}
            {NonAuthRoutes}
            {GeneralRoutes}
          </Switch>
        </Suspense>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
