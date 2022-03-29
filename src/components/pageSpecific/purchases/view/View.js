import React from "react";
import { utcToLocalTime } from "../../../../utils/timeHelper";

function PurchaseView({ formData }) {
  return (
    <>
      <div className="row">
        <div className="col-md-6 border-end">
          <div className="mb-3 offset-md-6">
            <label htmlFor="input1" className="form-label">
              Date of purchase
            </label>
            <span id="input1" className="form-control">
              {utcToLocalTime(formData.purchaseDate, "DD-MM-YYYY")}
            </span>
          </div>
          <div className="mb-3">
            <label htmlFor="input2" className="form-label">
              Raw Material
            </label>
            <span id="input2" className="form-control">
              {formData.rawMaterial && formData.rawMaterial.id
                ? formData.rawMaterial.name
                : ""}
            </span>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="input3" className="form-label">
                  Unit Value
                </label>
                <span id="input3" className="form-control">
                  {formData.unitValue}
                </span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="input4" className="form-label">
                  Unit of measurement
                </label>
                <span id="input4" className="form-control">
                  {formData.measurementUnit}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="input5" className="form-label">
                  Units Purchased
                </label>
                <span id="input5" className="form-control">
                  {formData.unitsPurchased}
                </span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="input6" className="form-label">
                  Purchase price
                </label>
                <span id="input6" className="form-control">
                  {formData.purchasePrice}
                </span>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="input7" className="form-label">
              Due date
            </label>
            <span id="input7" className="form-control">
              {utcToLocalTime(formData.dueDate, "YYYY-MM-DD")}
            </span>
          </div>
          <div className="mb-3">
            <label htmlFor="input8" className="form-label">
              Lot
            </label>
            <span id="input8" className="form-control">
              {formData.lot}
            </span>
          </div>
        </div>
        <div className="col-md-6 border-start">
          <h5>Standardization</h5>
          <div className="mb-3">
            <label htmlFor="input9" className="form-label">
              Projected Value
            </label>
            <span id="input9" className="form-control">
              {formData.rawMaterial.unitValue ?? ""}
            </span>
          </div>
          <div className="mb-3">
            <label htmlFor="input10" className="form-label">
              Supplier
            </label>
            <span id="input10" className="form-control">
              {formData.rawMaterial.supplier ?? ""}
            </span>
          </div>
          <div className="pt-3 pb-3 offset-md-2 col-md-8">
            <hr />
          </div>
          <div className="mb-3">
            <label htmlFor="input11" className="form-label">
              Presentation
            </label>
            <span id="input11" className="form-control">
              {formData.rawMaterial.presentation ?? ""}
            </span>
          </div>
          <div className="mb-3">
            <label htmlFor="input12" className="form-label">
              Quantity Available
            </label>
            <span id="input12" className="form-control">
              {formData.rawMaterial.quantityAvailable ?? ""}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default PurchaseView;
