import React, { useEffect } from "react";
import "./ResetPassword.scss";

function ResetPassword() {
  useEffect(() => {
    document.title = `${process.env.REACT_APP_NAME} | Reset Password`;
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
        <h1 className="h3 mb-3 fw-normal text-white">Please sign in</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <button className="w-100 btn btn-lg btn-app rounded-pill" type="submit">
          Forgot Password
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
