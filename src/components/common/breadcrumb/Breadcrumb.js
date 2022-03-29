import React from "react";
import PropTypes from "prop-types";
import "./Breadcrumb.scss";
import { Link } from "react-router-dom";

function Breadcrumb({ breadCrumbs }) {
  return (
    <nav className="float-sm-end" aria-label="breadcrumb">
      <ol className="breadcrumb">
        {breadCrumbs.map((value, index) => {
          const activeLink = value.link && value.link !== "";
          return (
            <li
              className={`breadcrumb-item ${activeLink ? "active" : ""}`}
              key={index}
            >
              {activeLink ? (
                <Link to={value.link}>{value.name}</Link>
              ) : (
                value.name
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

Breadcrumb.propTypes = {
  breadCrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
};

Breadcrumb.defaultProps = {
  breadCrumbs: [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
  ],
};

export default Breadcrumb;
