import React from "react";
import { statuses, filePathUrl } from "../../../../utils/appConstants";
import { utcToLocalTime } from "../../../../utils/timeHelper";
import FileInput from "../../../common/fileInput/FileInput";
import SelectDynamic from "../../../common/select/Select";
import TextInput from "../../../common/textInput/TextInput";

function TreeForm({
  formData,
  _handleOnChange,
  zones,
  _fetchAllZones,
  sectors,
  _fetchAllSectors,
  formValidationData,
  _handleFormValidation,
}) {
  return (
    <>
      {formData.id ? <input type="hidden" value={formData.id} /> : ""}
      <div className="row mb-3">
        <div className="col-sm-12 col-md-6">
          <TextInput
            id="input1"
            type="text"
            placeholder="Scan Id"
            name="scanId"
            isRequired={true}
            value={formData.scanId}
            onChange={_handleOnChange}
            validations={["required"]}
            formValidationData={formValidationData}
            _handleFormValidation={_handleFormValidation}
          />
        </div>
        <div className="col-sm-12 col-md-6">
          <TextInput
            id="input2"
            type="date"
            placeholder="Date"
            name="date"
            isRequired={true}
            value={utcToLocalTime(formData.date, "YYYY-MM-DD")}
            onChange={_handleOnChange}
            validations={["required"]}
            formValidationData={formValidationData}
            _handleFormValidation={_handleFormValidation}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-sm-12 col-md-6">
          <SelectDynamic
            id="input3"
            value={
              formData.zone && formData.zone.id
                ? {
                    value: formData.zone.id,
                    label: formData.zone.name,
                  }
                : null
            }
            name="zoneId"
            placeholder="Zone"
            options={zones.map((zone) => ({
              value: zone.id,
              label: zone.name,
            }))}
            onInputChange={_fetchAllZones}
            onChange={(e) => {
              _handleOnChange(e);
              _handleOnChange({
                currentTarget: {
                  name: "zone",
                  value:
                    zones[
                      zones
                        .map(function (e) {
                          return e.id;
                        })
                        .indexOf(e.currentTarget.value)
                    ],
                },
              });
            }}
            isRequired={false}
            validations={[""]}
            formValidationData={formValidationData}
            _handleFormValidation={_handleFormValidation}
          />
        </div>
        <div className="col-sm-12 col-md-6">
          <SelectDynamic
            id="input4"
            value={
              formData.sector &&
              Array.isArray(formData.sector) &&
              formData.sector.length > 0
                ? formData.sector.map((secData) => ({
                    value: secData.id,
                    label: secData.name,
                  }))
                : null
            }
            name="sectorId"
            placeholder="Sector"
            isMultiple={true}
            options={sectors.map((sector) => ({
              value: sector.id,
              label: sector.name,
            }))}
            onInputChange={_fetchAllSectors}
            onChange={(e) => {
              _handleOnChange(e);
              _handleOnChange({
                currentTarget: {
                  name: "sector",
                  value: e.currentTarget.value.map(
                    (sectorId) =>
                      sectors[
                        sectors
                          .map(function (e) {
                            return e.id;
                          })
                          .indexOf(sectorId)
                      ]
                  ),
                },
              });
            }}
            formValidationData={formValidationData}
            _handleFormValidation={_handleFormValidation}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-sm-12 col-md-6">
          <TextInput
            id="input5"
            className="form-control"
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
            id="input6"
            className="form-control"
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

      <FileInput
        id="input7"
        name="files"
        isMultiple
        label="Files"
        existingFiles={formData.files}
        _onChange={_handleOnChange}
        fileUrl={filePathUrl.trees}
      />

      <div className="row col-12 mb-3">
        <div className="col-12">
          <label htmlFor="input8" className="form-label">
            Status <span className="text-danger">*</span>
          </label>
          <select
            id="input8"
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

export default TreeForm;
