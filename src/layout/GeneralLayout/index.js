import React from "react";
import "./GeneralLayout.scss";

function GeneralLayout({ children }) {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <main className="ms-sm-auto px-md-3">{children}</main>
        </div>
      </div>
    </>
  );
}

export default GeneralLayout;
