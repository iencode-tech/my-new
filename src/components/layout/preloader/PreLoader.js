import React from "react";
import "./PreLoader.scss";

// Main Footer
function PreLoader() {
  return (
    <div className="preloader flex-column justify-content-center align-items-center">
      <img
        className="animation__wobble"
        src="/admin/image/logo192.png"
        alt="AdminLTELogo"
      />
    </div>
  );
}

export default PreLoader;
