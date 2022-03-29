import React from "react";
import { statuses } from "../../../../utils/appConstants";
import TextInput from "../../../common/textInput/TextInput";
import SoilForm from "../linked/soils/form/Form";

function ZoneForm({ formData, _handleOnChange, _addNewSoil, _removeSoil, formValidationData, _handleFormValidation }) {
  return (
    <>
      {formData.id ? <input type="hidden" value={formData.id} /> : ""}

      <div className="row mb-3">
        <div className="col-12">
          <TextInput
            id="input1"
            type="text"
            placeholder="Name"
            name="name"
            isRequired={true}
            value={formData.name}
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
            id="input2"
            type="text"
            placeholder="Latitude"
            name="latitude"
            isRequired={true}
            value={formData.latitude}
            onChange={_handleOnChange}
            validations={["required", "float"]}
            formValidationData={formValidationData}
            _handleFormValidation={_handleFormValidation}
          />
        </div>
        <div className="col-sm-12 col-md-6">
          <TextInput
            id="input3"
            type="text"
            placeholder="Longitude"
            name="longitude"
            isRequired={true}
            value={formData.longitude}
            onChange={_handleOnChange}
            validations={["required", "float"]}
            formValidationData={formValidationData}
            _handleFormValidation={_handleFormValidation}
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="input4" className="form-label">
          Status <span className="text-danger">*</span>
        </label>
        <select
          id="input4"
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

      <div className="mb-3">
        <div className="card">
          <div className="card-header border-transparent">
            <h4 className="m-0">
              Soil&nbsp;
              <button
                type="button"
                className="btn btn-sm btn-app ms-3"
                onClick={_addNewSoil}
              >
                Add
              </button>
            </h4>
          </div>
          <div className="card-body">
            {formData.soils.map((value, index) => (
              <SoilForm
                key={index}
                formData={value}
                _handleOnChange={(e) => _handleOnChange(e, ["soils", index])}
                _handleRemoveBtnClick={(e) => _removeSoil(index, e)}
                formValidationData={formValidationData}
                _handleFormValidation={_handleFormValidation}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ZoneForm;
