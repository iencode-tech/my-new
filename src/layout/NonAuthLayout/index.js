import React from "react";
import "./NonAuthLayout.scss";

function NonAuthLayout({ children }) {
  return (
    <>
      <div className="container-fluid p-0">
        <main>{children}</main>
      </div>
    </>
  );
}

export default NonAuthLayout;
