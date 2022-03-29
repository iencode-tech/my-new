import React from "react";
import TextInput from "../../../../../common/textInput/TextInput";
import { utcToLocalTime } from "../../../../../../utils/timeHelper";

function SoilForm({
  formData,
  _handleOnChange,
  _handleRemoveBtnClick,
  formValidationData,
  _handleFormValidation,
}) {
  return (
    <div className="card mb-3">
      <div className="card-header border-transparent">
        <button
          type="button"
          className="btn btn-sm btn-danger ms-3 float-end"
          onClick={_handleRemoveBtnClick}
        >
          Remove
        </button>
      </div>
      <div className="card-body">
        {formData.id ? <input type="hidden" value={formData.id} /> : ""}
        <div className="row">
          <div className="col-3">
            <TextInput
              id="sfInput1"
              type="text"
              placeholder="Soil Type"
              name="soilType"
              value={formData.soilType}
              onChange={_handleOnChange}
              validations={["alpha"]}
              formValidationData={formValidationData}
              _handleFormValidation={_handleFormValidation}
            />
          </div>
          <div className="col-3">
            <TextInput
              id="sfInput2"
              type="date"
              placeholder="Date"
              name="date"
              value={utcToLocalTime(formData.date, "YYYY-MM-DD")}
              onChange={_handleOnChange}
              validations={["alpha"]}
              formValidationData={formValidationData}
              _handleFormValidation={_handleFormValidation}
            />
          </div>
          <div className="col-2">
            <TextInput
              id="sfInput3"
              type="text"
              placeholder="PH"
              name="ph"
              value={formData.ph}
              onChange={_handleOnChange}
              validations={["numeric"]}
              formValidationData={formValidationData}
              _handleFormValidation={_handleFormValidation}
            />
          </div>
          <div className="col-2">
            <TextInput
              id="sfInput4"
              type="text"
              placeholder="Clay"
              name="clay"
              value={formData.clay}
              onChange={_handleOnChange}
              validations={["numeric"]}
              formValidationData={formValidationData}
              _handleFormValidation={_handleFormValidation}
            />
          </div>
          <div className="col-2">
            <TextInput
              id="sfInput5"
              type="text"
              placeholder="Sand"
              name="sand"
              value={formData.sand}
              onChange={_handleOnChange}
              validations={["numeric"]}
              formValidationData={formValidationData}
              _handleFormValidation={_handleFormValidation}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <TextInput
              id="sfInput6"
              type="text"
              placeholder="Calcium"
              name="calcium"
              value={formData.calcium}
              onChange={_handleOnChange}
              validations={["numeric"]}
              formValidationData={formValidationData}
              _handleFormValidation={_handleFormValidation}
            />
          </div>
          <div className="col-2">
            <TextInput
              id="sfInput7"
              type="text"
              placeholder="Magnesium"
              name="magnesium"
              value={formData.magnesium}
              onChange={_handleOnChange}
              validations={["numeric"]}
              formValidationData={formValidationData}
              _handleFormValidation={_handleFormValidation}
            />
          </div>
          <div className="col-2">
            <TextInput
              id="sfInput8"
              type="text"
              placeholder="Potassium"
              name="potassium"
              value={formData.potassium}
              onChange={_handleOnChange}
              validations={["numeric"]}
              formValidationData={formValidationData}
              _handleFormValidation={_handleFormValidation}
            />
          </div>
          <div className="col-2">
            <TextInput
              id="sfInput9"
              type="text"
              placeholder="Sodium"
              name="sodium"
              value={formData.sodium}
              onChange={_handleOnChange}
              validations={["numeric"]}
              formValidationData={formValidationData}
              _handleFormValidation={_handleFormValidation}
            />
          </div>
          <div className="col-2">
            <TextInput
              id="sfInput10"
              type="text"
              placeholder="Aluminum"
              name="aluminum"
              value={formData.aluminum}
              onChange={_handleOnChange}
              validations={["numeric"]}
              formValidationData={formValidationData}
              _handleFormValidation={_handleFormValidation}
            />
          </div>
          <div className="col-2">
            <TextInput
              id="sfInput11"
              type="text"
              placeholder="Silt"
              name="silt"
              value={formData.silt}
              onChange={_handleOnChange}
              validations={["numeric"]}
              formValidationData={formValidationData}
              _handleFormValidation={_handleFormValidation}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <TextInput
              id="sfInput12"
              type="textarea"
              placeholder="Observation"
              name="observation"
              value={formData.observation}
              onChange={_handleOnChange}
              validations={["alphanumeric"]}
              formValidationData={formValidationData}
              _handleFormValidation={_handleFormValidation}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SoilForm;
