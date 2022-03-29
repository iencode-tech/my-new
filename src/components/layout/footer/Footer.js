import React from "react";
import "./Footer.scss";

// Main Footer
function Footer() {
  return (
    <footer className="footer offset-md-3 offset-lg-2 mt-auto py-3 bg-light shadow border-app fixed-bottom">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <strong>
              Copyright &copy; 2014-{new Date().getFullYear()}{" "}
              <a href="/">El Cateo</a>.
            </strong>{" "}
            All rights reserved.
          </div>

          <div className="col-6 text-end d-none d-sm-inline-block">
            <b>Version</b> 1.1.0
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
