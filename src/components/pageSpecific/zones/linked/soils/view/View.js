import React from "react";
import { utcToLocalTime } from "../../../../../../utils/timeHelper";

function SoilView({ formData, _handleOnChange, _handleRemoveBtnClick }) {
  return (
    <div className="card mb-3">
      <div className="card-header border-transparent"></div>
      <div className="card-body">
        <div className="row">
          <div className="col-6 mb-3">
            <label htmlFor="sfInput1" className="form-label">
              Soil Type
            </label>
            <span id="sfInput1" className="form-control">
              {formData.soilType}
            </span>
          </div>
          <div className="col-6 mb-3">
            <label htmlFor="sfInput2" className="form-label">
              Date
            </label>
            <span id="sfInput2" className="form-control">
              {utcToLocalTime(formData.date, "YYYY-MM-DD")}
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-sm-12 mb-3">
            <label htmlFor="sfInput3" className="form-label">
              PH
            </label>
            <span id="sfInput3" className="form-control">
              {formData.ph}
            </span>
          </div>
          <div className="col-md-4 col-sm-12 mb-3">
            <label htmlFor="sfInput4" className="form-label">
              Clay
            </label>
            <span id="sfInput4" className="form-control">
              {formData.clay}
            </span>
          </div>
          <div className="col-md-4 col-sm-12 mb-3">
            <label htmlFor="sfInput5" className="form-label">
              Sand
            </label>
            <span id="sfInput5" className="form-control">
              {formData.sand}
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-sm-12 mb-3">
            <label htmlFor="sfInput6" className="form-label">
              Calcium
            </label>
            <span id="sfInput6" className="form-control">
              {formData.calcium}
            </span>
          </div>
          <div className="col-md-4 col-sm-12 mb-3">
            <label htmlFor="sfInput7" className="form-label">
              Magnesium
            </label>
            <span id="sfInput7" className="form-control">
              {formData.magnesium}
            </span>
          </div>
          <div className="col-md-4 col-sm-12 mb-3">
            <label htmlFor="sfInput8" className="form-label">
              Potassium
            </label>
            <span id="sfInput8" className="form-control">
              {formData.potassium}
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-sm-12 mb-3">
            <label htmlFor="sfInput9" className="form-label">
              Sodium
            </label>
            <span id="sfInput9" className="form-control">
              {formData.sodium}
            </span>
          </div>
          <div className="col-md-4 col-sm-12 mb-3">
            <label htmlFor="sfInput10" className="form-label">
              Aluminum
            </label>
            <span id="sfInput10" className="form-control">
              {formData.aluminum}
            </span>
          </div>
          <div className="col-md-4 col-sm-12 mb-3">
            <label htmlFor="sfInput11" className="form-label">
              Silt
            </label>
            <span id="sfInput11" className="form-control">
              {formData.silt}
            </span>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="sfInput12" className="form-label">
            Observation
          </label>
          <span id="sfInput12" className="form-control">
            {formData.observation}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SoilView;
