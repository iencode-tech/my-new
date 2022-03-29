import React from "react";
import { statuses, filePathUrl } from "../../../../utils/appConstants";
import TextInput from "../../../common/textInput/TextInput";
import FileInput from "../../../common/fileInput/FileInput";

function IllnessForm({
  formData,
  _handleOnChange,
  formValidationData,
  _handleFormValidation,
}) {
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
        <div className="col-12">
          <label htmlFor="input2" className="form-label">
            Observation
          </label>
          <textarea
            id="input2"
            className="form-control"
            placeholder="Observation"
            name="observation"
            onChange={_handleOnChange}
            value={formData.observation}
          />
        </div>
      </div>

      <FileInput
        id="input3"
        name="files"
        isMultiple
        label="Files"
        existingFiles={formData.files}
        _onChange={_handleOnChange}
        fileUrl={filePathUrl.illnesses}
      />

      <div className="row mb-3">
        <div className="col-12">
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
      </div>
    </>
  );
}

export default IllnessForm;
