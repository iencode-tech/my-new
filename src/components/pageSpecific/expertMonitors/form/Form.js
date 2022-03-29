import React from "react";
import {
  statuses,
  treeHealthStatuses,
  filePathUrl,
} from "../../../../utils/appConstants";
import SelectDynamic from "../../../common/select/Select";
import FileInput from "../../../common/fileInput/FileInput";
import TextInput from "../../../common/textInput/TextInput";

function ExpertMonitorForm({
  formData,
  _handleOnChange,
  illnessListData,
  _fetchAllIllnesses,
  treeListData,
  _fetchAllTrees,
  formValidationData,
  _handleFormValidation
}) {
  console.log("formData.tree ", formData.tree)
  console.log("treeListData ", treeListData)
  return (
    <>
      {formData.id ? <input type="hidden" value={formData.id} /> : ""}
      <div className="mb-3">
        <SelectDynamic
          id="input1"
          value={
            formData.illness
              ? { value: formData.illness.id, label: formData.illness.name }
              : null
          }
          name="illnessId"
          placeholder="Illness"
          options={illnessListData.map((illnessData) => ({
            value: illnessData.id,
            label: illnessData.name,
          }))}
          onInputChange={_fetchAllIllnesses}
          onChange={_handleOnChange}
          formValidationData={formValidationData}
          _handleFormValidation={_handleFormValidation}
        />
      </div>

      <div className="mb-3">
        <SelectDynamic
          id="input2"
          value={
            formData.tree
              ? { value: formData.tree.id, label: formData.tree.scanId }
              : null
          }
          name="treeId"
          placeholder="Tree"
          isRequired={false}
          options={treeListData.map((treeData) => ({
            value: treeData.id,
            label: treeData.scanId,
          }))}
          onInputChange={_fetchAllTrees}
          onChange={_handleOnChange}
          validations={[""]}
          formValidationData={formValidationData}
          _handleFormValidation={_handleFormValidation}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="input3" className="form-label">
          Health <span className="text-danger">*</span>
        </label>
        <select
          id="input3"
          className="form-control"
          placeholder="Health"
          name="healthStatus"
          value={parseInt(formData.healthStatus)}
          onChange={_handleOnChange}
        >
          {Object.keys(treeHealthStatuses).map((treeHealthStatus, index) => (
            <option key={index} value={treeHealthStatus}>
              {treeHealthStatuses[treeHealthStatus]}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <TextInput
            id="input4"
            type="textarea"
            placeholder="Observation"
            name="observation"
            value={formData.observation}
            onChange={_handleOnChange}
            formValidationData={formValidationData}
            _handleFormValidation={_handleFormValidation}
          />
      </div>

      <FileInput
        id="input5"
        name="files"
        isMultiple
        label="Files"
        existingFiles={formData.files}
        _onChange={_handleOnChange}
        fileUrl={filePathUrl.expertMonitor}
      />

      <div className="mb-3">
        <label htmlFor="input6" className="form-label">
          Status <span className="text-danger">*</span>
        </label>
        <select
          id="input6"
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
    </>
  );
}

export default ExpertMonitorForm;
