import React, { useEffect } from "react";
import "./Login.scss";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  attempt,
  handleDataChange,
  selectLogin,
} from "../../store/redux/Page/Login";
import { authCheck } from "../../utils/authHelper";

function Login(props) {
  const store = useSelector(selectLogin);
  const dispatch = useDispatch();
  const history = useHistory();

  const _handleOnChange = (e) => {
    dispatch(
      handleDataChange({
        key: e.currentTarget.name,
        value: e.currentTarget.value,
      })
    );
  };
  const _handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(attempt(store.loginForm));
  };

  useEffect(() => {
    document.title = `${process.env.REACT_APP_NAME} | Login`;
  }, []);

  useEffect(() => {
    if (store.loading === false) {
      if (!store.isError) {
        if (authCheck()) {
          history.push("/dashboard");
        }
      }
    }
  });

  return (
    <div className="form-body">
      <form className="form-signin" onSubmit={_handleFormSubmit}>
        <img
          className="mb-4"
          src="/admin/image/logo192.png"
          alt=""
          height="57"
        />
        <h1 className="h3 mb-3 fw-normal text-white">Please sign in</h1>

        <div className="form-floating">
          <input
            onChange={_handleOnChange}
            name="email"
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            onChange={_handleOnChange}
            name="password"
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <div className="row text-white">
          <div className="col-6 checkbox mb-3 text-white">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <div className="col-6 text-white">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </div>
        <button className="w-100 btn btn-lg btn-app rounded-pill" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}

export default Login;
