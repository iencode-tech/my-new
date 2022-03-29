import React from "react";
import { personRoles, statuses } from "../../../../utils/appConstants";

function PersonView({ formData }) {
  return (
    <>
      <div className="mb-3">
        <label htmlFor="input1" className="form-label">
          First Name
        </label>
        <span id="input1" className="form-control">
          {formData.firstName}
        </span>
      </div>

      <div className="mb-3">
        <label htmlFor="input2" className="form-label">
          Last name
        </label>
        <span id="input2" className="form-control">
          {formData.lastName}
        </span>
      </div>

      <div className="mb-3">
        <label htmlFor="input3" className="form-label">
          Email
        </label>
        <span id="input3" className="form-control">
          {formData.email}
        </span>
      </div>

      <div className="mb-3">
        <label htmlFor="input4" className="form-label">
          Phone
        </label>
        <span id="input4" className="form-control">
          {formData.phone}
        </span>
      </div>

      <div className="mb-3">
        <label htmlFor="input5" className="form-label">
          Address
        </label>
        <span id="input5" className="form-control">
          {formData.address}
        </span>
      </div>

      <div className="mb-3">
        <label htmlFor="input6" className="form-label">
          Role
        </label>
        <span id="input6" className="form-control">
          {personRoles[formData.role]}
        </span>
      </div>

      <div className="mb-3">
        <label htmlFor="input9" className="form-label">
          Status
        </label>
        <span id="input9" className="form-control">
          {statuses[parseInt(formData.status)]}
        </span>
      </div>
    </>
  );
}

export default PersonView;
