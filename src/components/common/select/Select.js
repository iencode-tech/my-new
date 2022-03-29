import React, { useEffect, useState } from "react";
import _ from "lodash";
import Select from "react-select";
import PropTypes from "prop-types";
import "./Select.scss";

import InputLabel from "../inputLabel/InputLabel";
import { validate } from "../../../utils/validationHelper";

function SelectDynamic(props) {
  const [selectValue, setSelectValue] = useState(null);

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

  useEffect(() => {
    if (selectValue === null) {
      setSelectValue(props.value);
    }
  }, [props.value]);

  return (
    <>
      {!props.hideLabel && (
        <InputLabel
          inputId={props.id}
          labelText={props.placeholder}
          isRequired={props.isRequired}
        />
      )}
      <Select
        id={props.id}
        className={`${props.className || ""} basic-single`}
        classNamePrefix="select"
        styles={{
          control: () => ({
            WebkitAlignItems: "center",
            WebkitBoxAlign: "center",
            msFlexAlign: "center",
            alignItems: "center",
            backgroundColor: "hsl(0, 0%, 100%)",
            borderColor:
              props.formValidationData[props.name] &&
              props.formValidationData[props.name].status === false
                ? "#dc3545"
                : "hsl(0, 0%, 80%)",
            borderRadius: "4px",
            borderStyle: "solid",
            borderWidth: "1px",
            cursor: "default",
            display: ["-webkit-box", "-webkit-flex", "-ms-flexbox", "flex"],
            WebkitBoxFlexWrap: "wrap",
            WebkitFlexWrap: "wrap",
            msFlexWrap: "wrap",
            flexWrap: "wrap",
            WebkitBoxPack: "justify",
            WebkitJustifyContent: "space-between",
            justifyContent: "space-between",
            minHeight: "38px",
            outline: "0 !important",
            position: "relative",
            WebkitTransition: "all 100ms",
            transition: "all 100ms",
            boxiSizing: "border-box",
          }),
        }}
        defaultValue={props.defaultValue}
        value={selectValue}
        isLoading={false}
        isDisabled={props.disabled ?? false}
        isSearchable={true}
        isMulti={props.isMultiple}
        name={props.name}
        options={props.options}
        onInputChange={(inputValue) => {
          props.onInputChange(inputValue);
        }}
        onChange={(option, element) => {
          let value = "";
          if (Array.isArray(option) && option.length > 0) {
            value = _.chain(option)
              .map((o) => o.value)
              .value();
          } else {
            value = option.value;
          }
          setSelectValue(option);
          return props.onChange({
            currentTarget: { name: element.name, value },
          });
        }}
        onBlur={(e) => _validate(e.currentTarget.value)}
      />
      {props.formValidationData[props.name] &&
        props.formValidationData[props.name].status === false && (
          <div className="invalid-feedback d-block">
            {props.formValidationData[props.name].message}
          </div>
        )}
    </>
  );
}

SelectDynamic.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  isMultiple: PropTypes.bool,
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  hideLabel: PropTypes.bool,
  defaultValue: PropTypes.object,
  onInputChange: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  validations: PropTypes.array,
  formValidationData: PropTypes.object,
  _handleFormValidation: PropTypes.func,
};

SelectDynamic.defaultProps = {
  isMultiple: false,
  isRequired: false,
  hideLabel: false,
  validations: [],
  formValidationData: {},
  _handleFormValidation: () => {},
};

export default SelectDynamic;
