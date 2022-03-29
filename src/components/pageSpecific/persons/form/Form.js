import React from "react";
import { personRoles, statuses } from "../../../../utils/appConstants";
import TextInput from "../../../common/textInput/TextInput";

function PersonForm({
  formData,
  _handleOnChange,
  formValidationData,
  _handleFormValidation,
}) {
  return (
    <>
      {formData.id ? <input type="hidden" value={formData.id} /> : ""}

      <div className="row mb-3">
        <div className="col-sm-12 col-md-6">
          <TextInput
            id="input1"
            type="text"
            placeholder="First Name"
            name="firstName"
            isRequired={true}
            value={formData.firstName}
            onChange={_handleOnChange}
            validations={["required"]}
            formValidationData={formValidationData}
            _handleFormValidation={_handleFormValidation}
          />
        </div>
        <div className="col-sm-12 col-md-6">
          <TextInput
            id="input2"
            type="text"
            placeholder="Last Name"
            name="lastName"
            isRequired={true}
            value={formData.lastName}
            onChange={_handleOnChange}
            validations={["required"]}
            formValidationData={formValidationData}
            _handleFormValidation={_handleFormValidation}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-sm-12 col-md-6">
          <TextInput
            id="input3"
            type="email"
            placeholder="Email"
            name="email"
            isRequired={true}
            value={formData.email}
            onChange={_handleOnChange}
            validations={["required", "email"]}
            formValidationData={formValidationData}
            _handleFormValidation={_handleFormValidation}
          />
        </div>
        <div className="col-sm-12 col-md-6">
          <TextInput
            id="input4"
            type="tel"
            placeholder="Phone"
            name="phone"
            isRequired={true}
            value={formData.phone}
            onChange={_handleOnChange}
            validations={["required"]}
            formValidationData={formValidationData}
            _handleFormValidation={_handleFormValidation}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12">
          <TextInput
            id="input5"
            type="textarea"
            placeholder="Address"
            name="address"
            isRequired={true}
            value={formData.address}
            onChange={_handleOnChange}
            validations={["required"]}
            formValidationData={formValidationData}
            _handleFormValidation={_handleFormValidation}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12">
          <label htmlFor="input6" className="form-label">
            Role <span className="text-danger">*</span>
          </label>
          <select
            id="input6"
            className="form-select"
            name="role"
            onChange={_handleOnChange}
            value={formData.role}
          >
            {Object.keys(personRoles).map((personRole, index) => (
              <option key={index} value={personRole}>
                {personRoles[personRole]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-sm-12 col-md-6">
          <TextInput
            id="input7"
            type="password"
            placeholder="Password"
            name="password"
            isRequired={true}
            value={formData.password}
            onChange={_handleOnChange}
            validations={["required"]}
            formValidationData={formValidationData}
            _handleFormValidation={_handleFormValidation}
          />
        </div>
        {!formData.id ? (
          <div className="col-sm-12 col-md-6">
            <TextInput
              id="input8"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              isRequired={true}
              value={formData.confirmPassword}
              onChange={_handleOnChange}
              validations={["required", `equals:Password:${formData.password}`]}
              formValidationData={formValidationData}
              _handleFormValidation={_handleFormValidation}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="input9" className="form-label">
          Status <span className="text-danger">*</span>
        </label>
        <select
          id="input9"
          className="form-select"
          name="status"
          onChange={_handleOnChange}
          value={parseInt(formData.status)}
        >
          {Object.keys(statuses).map((status, index) => (
            <option key={index} value={status}>
              {statuses[status]}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default PersonForm;
