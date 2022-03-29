import React from "react";
import { methods, statuses } from "../../../../utils/appConstants";
import RawMaterialForm from "../linked/rawMaterial/form/Form";
import { utcToLocalTime } from "../../../../utils/timeHelper";
import TextInput from "../../../common/textInput/TextInput";

function AgriculturalPracticeForm({
  formData,
  rawMaterialList,
  _handleOnChange,
  _addNewRawMaterial,
  _removeRawMaterial,
  _fetchAllRawMaterials,
  defaultFolialDrencheData,
  formValidationData,
_handleFormValidation
}) {
  return (
    <>
      {formData.id ? <input type="hidden" value={formData.id} /> : ""}
      <div className="row mb-3">
        <div className="col-md-6">
        <TextInput
            id="input1"
            type="text"
            placeholder="Formulation Name"
            name="formulationName"
            isRequired={true}
            value={formData.formulationName}
            onChange={_handleOnChange}
            validations={["required", "alpha"]}
            formValidationData={formValidationData}
            _handleFormValidation={_handleFormValidation}
          />
        </div>

        <div className="col-md-3">
        <TextInput
            id="input2"
            type="date"
            placeholder="Schedule Date"
            name="scheduledDate"
            isRequired={true}
            value={utcToLocalTime(formData.scheduledDate, "YYYY-MM-DD")}
            onChange={_handleOnChange}
            validations={["required"]}
            formValidationData={formValidationData}
            _handleFormValidation={_handleFormValidation}
          />
        </div>

        <div className="col-md-3">
        <TextInput
            id="input3"
            type="text"
            placeholder="Days to do"
            name="daysToDo"
            isRequired={true}
            value={formData.daysToDo}
            onChange={_handleOnChange}
            validations={["required", "numeric"]}
            formValidationData={formValidationData}
            _handleFormValidation={_handleFormValidation}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="input8" className="form-label">
            Method <span className="text-danger">*</span>
          </label>
          <select
            id="input8"
            className="form-select"
            name="method"
            onChange={(e) => {
              _handleOnChange(e);
              _handleOnChange({
                currentTarget: { name: "rawMaterials", value: [] },
              });
              let unit = "g";
              if ([0, 2].indexOf(parseInt(e.currentTarget.value)) > -1) {
                unit = "cc";
                _addNewRawMaterial(
                  { material: defaultFolialDrencheData, quantity: 1000 },
                  null
                );
              }
              _fetchAllRawMaterials("", unit);
            }}
            value={parseInt(formData.method)}
          >
            {Object.keys(methods).map((method, index) => (
              <option key={index} value={method}>
                {methods[method]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-3">
        <TextInput
            id="input11"
            type="textarea"
            placeholder="Observations"
            name="observations"
            isRequired={true}
            value={formData.observations}
            onChange={_handleOnChange}
            formValidationData={formValidationData}
            _handleFormValidation={_handleFormValidation}
          />
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
            <h4 className="m-0">Raw Material</h4>
          </div>
          <div className="card-body">
            <RawMaterialForm
              formData={formData}
              listData={rawMaterialList}
              _handleOnChange={_handleOnChange}
              _addNewRawMaterial={_addNewRawMaterial}
              _handleRemoveBtnClick={_removeRawMaterial}
              _fetchAllRawMaterials={_fetchAllRawMaterials}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AgriculturalPracticeForm;
