import React from "react";
import PropTypes from "prop-types";
import "./InputLabel.scss";

function InputLabel(props) {
  return (
    <label htmlFor={props.inputId} className={props.className}>
      {props.labelText}{" "}
      {props.isRequired && <span className="text-danger">*</span>}
    </label>
  );
}

InputLabel.propTypes = {
  inputId: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  isRequired: PropTypes.bool.isRequired
};

InputLabel.defaultProps = {
  className: "form-label",
  isRequired: false,
  labelText: "",
};

export default InputLabel;
