import React from "react";
import {
  statuses,
  unitMetric,
  filePathUrl,
} from "../../../../utils/appConstants";
import FilePreview from "../../../common/filePreview/FilePreview";

function RawMaterialView({ formData }) {
  return (
    <>
      <div className={`row`}>
        <div className={`col-sm-12 col-md-6 border-end`}>
          <div className="mb-3">
            <label htmlFor="input1" className="form-label">
              Barcode
            </label>
            <span id="input1" className="form-control">
              {formData.barCode}
            </span>
          </div>

          <div className="mb-3">
            <label htmlFor="input2" className="form-label">
              Name
            </label>
            <span id="input2" className="form-control">
              {formData.name}
            </span>
          </div>

          <div className="mb-3">
            <label htmlFor="input3" className="form-label">
              Unit Value
            </label>
            <span id="input3" className="form-control">
              {formData.unitValue}
            </span>
          </div>

          <div className={`row`}>
            <div className={`col-sm-12 col-md-6`}>
              <div className="mb-3">
                <label htmlFor="input4" className="form-label">
                  Unit Metric
                </label>
                <span id="input4" className="form-control">
                  {unitMetric[formData.unitMetric]}
                </span>
              </div>
            </div>
            <div className={`col-sm-12 col-md-6`}>
              <div className="mb-3">
                <label htmlFor="input5" className="form-label">
                  Presentation
                </label>
                <span id="input5" className="form-control">
                  {formData.presentation}
                </span>
              </div>
            </div>
          </div>

          <div className={`row`}>
            <div className={`col-sm-12 col-md-6`}>
              <div className="mb-3">
                <label htmlFor="input6" className="form-label">
                  Quantity
                </label>
                <span id="input6" className="form-control">
                  {formData.quantity}
                </span>
              </div>
            </div>
            <div className={`col-sm-12 col-md-6`}>
              <div className="mb-3">
                <label htmlFor="input7" className="form-label">
                  Available Quantity
                </label>
                <span id="input7" className="form-control">
                  {formData.quantityAvailable}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={`col-sm-12 col-md-6`}>
          <h5 className={`text-center`}>Data Reference</h5>
          <div className="mb-3">
            <label htmlFor="input8" className="form-label">
              Projected Price
            </label>
            <span id="input8" className="form-control">
              {formData.price}
            </span>
          </div>
          <div className="mb-3">
            <label htmlFor="input9" className="form-label">
              Supplier
            </label>
            <span id="input9" className="form-control">
              {formData.supplier}
            </span>
          </div>
          <div className="mb-3">
            <label htmlFor="input10" className="form-label">
              Presentation <span className="text-danger">*</span>
            </label>
            <span id="input10" className="form-control">
              {formData.refPresentation}
            </span>
          </div>
        </div>
      </div>

      <hr />

      <FilePreview
        id="input11"
        files={formData.files}
        fileUrl={filePathUrl.rawMaterials}
      />

      <hr />

      <h5 className={`text-center`}>Care</h5>
      <div className={`row`}>
        <div className={`col-sm-12 col-md-6`}>
          <div className="mb-3">
            <label htmlFor="input12" className="form-label">
              Retirement Time
            </label>
            <span id="input12" className="form-control">
              {formData.retirementTime}
            </span>
          </div>
        </div>
        <div className={`col-sm-12 col-md-6`}>
          <div className="mb-3">
            <label htmlFor="input4" className="form-label">
              Quarantine Before Harvest
            </label>
            <span id="input4" className="form-control">
              {formData.quarantine}
            </span>
          </div>
        </div>
      </div>

      <hr />

      <div className={`card mb-3`}>
        <div className={`card-header`}>
          <h5 className={`text-center`}>Incompatible With Raw Material</h5>
        </div>
        <div className={`card-body`}>
          <div className={`row`} style={{ minHeight: 300 }}>
            <div className={`col-12`}>
              <ul className={`list-group`}>
                {formData.incompatibleRawMaterialData.map(
                  (listElement, index) => (
                    <li
                      key={index}
                      className={`list-group-item list-group-item-action`}
                    >
                      {listElement.name}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

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

export default RawMaterialView;
