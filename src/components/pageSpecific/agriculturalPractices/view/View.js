import React from "react";
import { methods, statuses } from "../../../../utils/appConstants";
import RawMaterialView from "../linked/rawMaterial/view/View";
import { utcToLocalTime } from "../../../../utils/timeHelper";

function AgriculturalPracticeView({ formData }) {
  return (
    <>
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="input1" className="form-label">
            Formulation Name
          </label>
          <span id="input1" className="form-control">
            {formData.formulationName}
          </span>
        </div>

        <div className="col-md-3">
          <label htmlFor="input2" className="form-label">
            Schedule Date
          </label>
          <span id="input2" className="form-control">
            {utcToLocalTime(formData.scheduledDate, "YYYY-MM-DD")}
          </span>
        </div>

        <div className="col-md-3">
          <label htmlFor="input3" className="form-label">
            Days to do
          </label>
          <span id="input3" className="form-control">
            {formData.daysToDo}
          </span>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="input8" className="form-label">
            Method
          </label>
          <span id="input8" className="form-control">
            {methods[parseInt(formData.method)]}
          </span>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="input11" className="form-label">
          Observations
        </label>
        <span id="input11" className="form-control" rows="4">
          {formData.observations}
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
            <h4 className="m-0">Raw Material</h4>
          </div>
          <div className="card-body">
            <RawMaterialView formData={formData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AgriculturalPracticeView;
