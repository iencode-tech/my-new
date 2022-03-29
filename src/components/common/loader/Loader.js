import React from "react";
import "./Loader.scss";

// Main Footer
function Loader() {
  return (
    <div className="preloader flex-column justify-content-center align-items-center">
      <img
        className="animation__wobble"
        src="/admin/image/logo512.png"
        alt="AdminLTELogo"
        height="60"
        width="60"
      />
    </div>
  );
}

export default Loader;
