import React from "react";
import { statuses, filePathUrl } from "../../../../utils/appConstants";
import { utcToLocalTime } from "../../../../utils/timeHelper";
import FileInput from "../../../common/fileInput/FileInput";
import FilePreview from "../../../common/filePreview/FilePreview";
import SelectDynamic from "../../../common/select/Select";

function TreeView({ formData }) {
  return (
    <>
      <div className="mb-3">
        <label htmlFor="input1" className="form-label">
          Scan Id
        </label>
        <span id="input1" className="form-control">
          {formData.scanId}
        </span>
      </div>

      <div className="mb-3">
        <label htmlFor="input2" className="form-label">
          Date
        </label>
        <span id="input2" className="form-control">
          {utcToLocalTime(formData.date, "YYYY-MM-DD")}
        </span>
      </div>

      <div className="mb-3">
        <label htmlFor="input3" className="form-label">
          Zone
        </label>
        <span id="input3" className="form-control">
          {formData.zone && formData.zone.id ? formData.zone.name : ""}
        </span>
      </div>

      {formData.sector &&
        Array.isArray(formData.sector) &&
        formData.sector.length > 0 && (
          <div className="mb-3">
            <label htmlFor="input4" className="form-label">
              Sector
            </label>
            <span id="input4" className="form-control">
              {formData.sector &&
              Array.isArray(formData.sector) &&
              formData.sector.length > 0
                ? formData.sector.map((secData) => secData.name).join(", ")
                : ""}
            </span>
          </div>
        )}

      <div className="mb-3">
        <label htmlFor="input5" className="form-label">
          Latitude
        </label>
        <span id="input5" className="form-control">
          {formData.latitude}
        </span>
      </div>

      <div className="mb-3">
        <label htmlFor="input6" className="form-label">
          Longitude
        </label>
        <span id="input6" className="form-control">
          {formData.longitude}
        </span>
      </div>

      <FilePreview
        id="input7"
        files={formData.files}
        fileUrl={filePathUrl.trees}
      />

      <div className="mb-3">
        <label htmlFor="input8" className="form-label">
          Status
        </label>
        <span id="input8" className="form-control">
          {statuses[parseInt(formData.status)]}
        </span>
      </div>
    </>
  );
}

export default TreeView;
