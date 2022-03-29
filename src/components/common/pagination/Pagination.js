import React from "react";
import PropTypes from "prop-types";
import "./Pagination.scss";
import { perPage } from "../../../utils/appConstants";
import {
  faEdit,
  faEye,
  faRedo,
  faSearch,
  faTrash,
  faArrowAltCircleLeft,
  faArrowLeft,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Pagination({ totalCount, currentPage, onPageChange }) {
  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-end">
        <li className={`page-item ${currentPage === 1 && "disabled"}`}>
          <button
            type="button"
            className={`page-link`}
            onClick={onPrevious}
            tabIndex="-1"
            aria-disabled="true"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </li>
        <li
          className={`page-item ${
            currentPage === Math.ceil(totalCount / perPage) && "disabled"
          }`}
        >
          <button type="button" className={`page-link`} onClick={onNext}>
          <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </li>
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  totalCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  totalCount: 0,
  currentPage: 1,
};

export default Pagination;
