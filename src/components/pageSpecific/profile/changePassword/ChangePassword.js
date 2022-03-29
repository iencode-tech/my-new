import React from "react";

function ChangePasswordForm({ formData, _handleOnChange }) {
  return (
    <>
      <div className="mb-3">
        <label htmlFor="input1" className="form-label">
          Current Password <span className="text-danger">*</span>
        </label>
        <input
          id="input1"
          className="form-control"
          type="password"
          placeholder="Current Password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={_handleOnChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="input2" className="form-label">
          New Password <span className="text-danger">*</span>
        </label>
        <input
          id="input2"
          className="form-control"
          type="password"
          placeholder="New Password"
          name="password"
          value={formData.password}
          onChange={_handleOnChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="input3" className="form-label">
          Confirm New Password <span className="text-danger">*</span>
        </label>
        <input
          id="input3"
          className="form-control"
          type="password"
          placeholder="Confirm New Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={_handleOnChange}
        />
      </div>
    </>
  );
}

export default ChangePasswordForm;
