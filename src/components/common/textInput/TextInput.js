import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./TextInput.scss";
import InputLabel from "../inputLabel/InputLabel";
import { validate } from "../../../utils/validationHelper";

function TextInput(props) {
  const _validate = (value) => {
    const validationData = validate(value || "", props.validations);
    if (validationData.status === false) {
      props._handleFormValidation(props.name, validationData);
    } else {
      props._handleFormValidation(props.name, null);
    }
  };

  // Remove if Validation causes issue
  useEffect(() => {
    _validate();
  }, []);

  return (
    <div className="m-2">
      <InputLabel
        inputId={props.id}
        className={props.labelClassName}
        labelText={props.placeholder}
        isRequired={props.isRequired}
      />
      {props.type === "textarea" && (
        <textarea
          id={props.id}
          className={`${props.inputClassName} ${
            props.formValidationData[props.name] &&
            props.formValidationData[props.name].status === false &&
            "is-invalid"
          }`}
          rows="3"
          placeholder={props.placeholder}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          onBlur={(e) => _validate(e.currentTarget.value)}
        />
      )}

      {["textarea"].indexOf(props.type) === -1 && (
        <input
          id={props.id}
          className={`${props.inputClassName} ${
            props.formValidationData[props.name] &&
            props.formValidationData[props.name].status === false &&
            "is-invalid"
          }`}
          type={props.type}
          placeholder={props.placeholder}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          onBlur={(e) => _validate(e.currentTarget.value)}
        />
      )}

      {props.formValidationData[props.name] &&
        props.formValidationData[props.name].status === false && (
          <div className="invalid-feedback">
            {props.formValidationData[props.name].message}
          </div>
        )}
    </div>
  );
}

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  labelClassName: PropTypes.string.isRequired,
  inputClassName: PropTypes.string.isRequired,
  isRequired: PropTypes.bool.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  validations: PropTypes.array,
  onChange: PropTypes.func.isRequired,
};

TextInput.defaultProps = {
  labelClassName: "form-label",
  inputClassName: "form-control",
  isRequired: false,
  validations: [],
  value: "",
  onChange: () => {},
};

export default TextInput;
