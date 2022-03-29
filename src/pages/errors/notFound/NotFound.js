import React, { useEffect } from "react";
import "./NotFound.scss";
import { Link } from "react-router-dom";

function NotFound() {
  useEffect(() => {
    document.title = `${process.env.REACT_APP_NAME} | Page Not Found`;
  });

  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
        </div>
        <h2>404 - Page not found</h2>
        <p>
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </p>
        <Link
          className={`btn btn-app`}
          style={{ boxShadow: "0px 4px 15px -5px #77BA33" }}
          to="/dashboard"
        >
          Get Me out of Here
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
