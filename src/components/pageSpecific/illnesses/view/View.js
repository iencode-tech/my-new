import React from "react";
import { statuses, filePathUrl } from "../../../../utils/appConstants";
import FilePreview from "../../../common/filePreview/FilePreview";

function IllnessView({ formData }) {
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
          Observation
        </label>
        <span id="input2" className="form-control">
          {formData.observation}
        </span>
      </div>

      <FilePreview
        id="input3"
        files={formData.files}
        fileUrl={filePathUrl.illnesses}
      />

      <div className="mb-3">
        <label htmlFor="input4" className="form-label">
          Status
        </label>
        <span id="input4" className="form-control">
          {statuses[parseInt(formData.status)]}
        </span>
      </div>
    </>
  );
}

export default IllnessView;
