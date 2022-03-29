import React from "react";
import { Link } from "react-router-dom";
import {
  statuses,
  treeHealthStatuses,
  filePathUrl,
} from "../../../../utils/appConstants";
import FilePreview from "../../../common/filePreview/FilePreview";

function ExpertMonitorView({ formData }) {
  return (
    <>
      <div className="mb-3">
        <label htmlFor="input1" className="form-label">
          Illness
        </label>
        <span id="input1" className="form-control">
          <Link to={formData.illness ? `/illness/${formData.illness.id}/view` : ""} target={"_blank"}>{formData.illness && formData.illness.name}</Link>
        </span>
      </div>

      <div className="mb-3">
        <label htmlFor="input2" className="form-label">
          Tree
        </label>
        <span id="input2" className="form-control">
          <Link to={formData.tree ? `/tree/${formData.tree.id}/view` : ""} target={"_blank"}>{formData.tree && formData.tree.scanId}</Link>
        </span>
      </div>

      <div className="mb-3">
        <label htmlFor="input3" className="form-label">
          Health
        </label>
        <span id="input3" className="form-control">
          {treeHealthStatuses[parseInt(formData.healthStatus)]}
        </span>
      </div>

      <div className="mb-3">
        <label htmlFor="input4" className="form-label">
          Observation
        </label>
        <span id="input4" className="form-control">
          {formData.observation}
        </span>
      </div>

      <FilePreview fileUrl={filePathUrl.expertMonitor} files={formData.files} />

      <div className="mb-3">
        <label htmlFor="input6" className="form-label">
          Status
        </label>
        <span id="input6" className="form-control">
          {statuses[parseInt(formData.status)]}
        </span>
      </div>
    </>
  );
}

export default ExpertMonitorView;
