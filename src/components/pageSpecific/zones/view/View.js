import React from "react";
import { statuses } from "../../../../utils/appConstants";
import SoilView from "../linked/soils/view/View";

function ZoneView({ formData, _handleOnChange, _addNewSoil, _removeSoil }) {
  return (
    <>
      <div className="mb-3">
        <label htmlFor="input1" className="form-label">
          Name
        </label>
        <span id="input1" className="form-control">
          {formData.name}
        </span>
      </div>

      <div className="mb-3">
        <label htmlFor="input2" className="form-label">
          Latitude
        </label>
        <span id="input2" className="form-control">
          {formData.latitude}
        </span>
      </div>

      <div className="mb-3">
        <label htmlFor="input3" className="form-label">
          Longitude
        </label>
        <span id="input3" className="form-control">
          {formData.longitude}
        </span>
      </div>

      <div className="mb-3">
        <label htmlFor="input4" className="form-label">
          Status
        </label>
        <span id="input4" className="form-control">
          {statuses[parseInt(formData.status)]}
        </span>
      </div>

      <div className="mb-3">
        <div className="card">
          <div className="card-header border-transparent">
            <h4 className="m-0">Soil</h4>
          </div>
          <div className="card-body">
            {formData.soils.map((value, index) => (
              <SoilView key={index} formData={value} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ZoneView;
