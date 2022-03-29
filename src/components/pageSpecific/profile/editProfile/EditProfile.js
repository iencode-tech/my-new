import React from "react";

function EditProfileForm({ formData, _handleOnChange }) {
  return (
    <>
      {formData.id ? <input type="hidden" value={formData.id} /> : ""}
      <div className="mb-3">
        <label htmlFor="input1" className="form-label">
          First Name <span className="text-danger">*</span>
        </label>
        <input
          id="input1"
          className="form-control"
          type="text"
          placeholder="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={_handleOnChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="input2" className="form-label">
          Last name <span className="text-danger">*</span>
        </label>
        <input
          id="input2"
          className="form-control"
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={_handleOnChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="input3" className="form-label">
          Email <span className="text-danger">*</span>
        </label>
        <input
          id="input3"
          className="form-control"
          type="text"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={_handleOnChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="input4" className="form-label">
          Phone <span className="text-danger">*</span>
        </label>
        <input
          id="input4"
          className="form-control"
          type="tel"
          placeholder="Phone"
          name="phone"
          value={formData.phone}
          onChange={_handleOnChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="input5" className="form-label">
          Address <span className="text-danger">*</span>
        </label>
        <textarea
          id="input5"
          className="form-control"
          rows="3"
          name="address"
          value={formData.address}
          onChange={_handleOnChange}
        />
      </div>
    </>
  );
}

export default EditProfileForm;
