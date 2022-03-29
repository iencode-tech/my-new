import React, { useEffect } from "react";
import "./ForgotPassword.scss";
import { Link } from "react-router-dom";

function ForgotPassword() {
  useEffect(() => {
    document.title = `${process.env.REACT_APP_NAME} | Forgot Password`;
  });

  return (
    <div className="form-body">
      <form className="form-signin">
        <img
          className="mb-4"
          src="/admin/image/logo192.png"
          alt=""
          height="57"
        />
        <h1 className="h3 mb-3 fw-normal text-white">Forgot Your Password?</h1>

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>

        <button className="w-100 btn btn-lg btn-app rounded-pill" type="submit">
          Send Password Reset Email
        </button>
        <Link
          className="w-100 btn btn-lg btn-outline-app rounded-pill mt-1"
          to="/login"
        >
          Login
        </Link>
      </form>
    </div>
  );
}

export default ForgotPassword;
