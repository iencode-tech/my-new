import React from "react";
import SelectDynamic from "../../../common/select/Select";
import { utcToLocalTime } from "../../../../utils/timeHelper";

function PurchaseForm({
  formData,
  rawMaterials,
  _fetchAllRawMaterials,
  _handleOnChange,
  formValidationData,
  _handleFormValidation,
}) {
  return (
    <>
      {formData.id ? <input type="hidden" value={formData.id} /> : ""}
      <div className="row">
        <div className="col-md-6 border-end">
          <div className="mb-3 offset-md-6">
            <label htmlFor="input1" className="form-label">
              Date of purchase <span className="text-danger">*</span>
            </label>
            <input
              id="input1"
              className="form-control"
              type="date"
              placeholder="Date of purchase"
              name="purchaseDate"
              value={utcToLocalTime(formData.purchaseDate, "YYYY-MM-DD")}
              onChange={_handleOnChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="input2" className="form-label">
              Raw Material <span className="text-danger">*</span>
            </label>
            <SelectDynamic
              id="input2"
              value={
                formData.rawMaterial && formData.rawMaterial.id
                  ? {
                      value: formData.rawMaterial.id,
                      label: formData.rawMaterial.name,
                    }
                  : null
              }
              name="rawMaterialId"
              options={rawMaterials.map((rawMaterial) => ({
                value: rawMaterial.id,
                label: rawMaterial.name,
              }))}
              onInputChange={_fetchAllRawMaterials}
              onChange={(e) => {
                _handleOnChange(e);
                _handleOnChange({
                  currentTarget: {
                    name: "rawMaterial",
                    value:
                      rawMaterials[
                        rawMaterials
                          .map(function (e) {
                            return e.id;
                          })
                          .indexOf(e.currentTarget.value)
                      ],
                  },
                });
              }}
            />
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="input3" className="form-label">
                  Unit Value <span className="text-danger">*</span>
                </label>
                <input
                  id="input3"
                  className="form-control"
                  type="text"
                  placeholder="Unit Value"
                  name="unitValue"
                  value={formData.unitValue}
                  onChange={_handleOnChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="input4" className="form-label">
                  Unit of measurement <span className="text-danger">*</span>
                </label>
                <input
                  id="input4"
                  className="form-control"
                  type="text"
                  placeholder="Unit of measurement"
                  name="measurementUnit"
                  value={formData.measurementUnit}
                  onChange={_handleOnChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="input5" className="form-label">
                  Units Purchased <span className="text-danger">*</span>
                </label>
                <input
                  id="input5"
                  className="form-control"
                  type="text"
                  placeholder="Units Purchased"
                  name="unitsPurchased"
                  value={formData.unitsPurchased}
                  onChange={_handleOnChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="input6" className="form-label">
                  Purchase price <span className="text-danger">*</span>
                </label>
                <input
                  id="input6"
                  className="form-control"
                  type="text"
                  placeholder="Purchase price"
                  name="purchasePrice"
                  value={formData.purchasePrice}
                  onChange={_handleOnChange}
                />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="input7" className="form-label">
              Due date <span className="text-danger">*</span>
            </label>
            <input
              id="input7"
              className="form-control"
              type="date"
              placeholder="Due date"
              name="dueDate"
              value={utcToLocalTime(formData.dueDate, "YYYY-MM-DD")}
              onChange={_handleOnChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="input8" className="form-label">
              Lot <span className="text-danger">*</span>
            </label>
            <input
              id="input8"
              className="form-control"
              type="text"
              placeholder="Lot"
              name="lot"
              value={formData.lot}
              onChange={_handleOnChange}
            />
          </div>
        </div>
        <div className="col-md-6 border-start">
          <h5>Standardization</h5>
          <div className="mb-3">
            <label htmlFor="input9" className="form-label">
              Projected Value <span className="text-danger">*</span>
            </label>
            <input
              id="input9"
              className="form-control"
              type="text"
              value={formData.rawMaterial.unitValue ?? ""}
              readOnly={true}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="input10" className="form-label">
              Supplier <span className="text-danger">*</span>
            </label>
            <input
              id="input10"
              className="form-control"
              type="text"
              value={formData.rawMaterial.supplier ?? ""}
              readOnly={true}
            />
          </div>
          <div className="pt-3 pb-3 offset-md-2 col-md-8">
            <hr />
          </div>
          <div className="mb-3">
            <label htmlFor="input11" className="form-label">
              Presentation <span className="text-danger">*</span>
            </label>
            <input
              id="input11"
              className="form-control"
              type="text"
              value={formData.rawMaterial.presentation ?? ""}
              readOnly={true}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="input12" className="form-label">
              Quantity Available <span className="text-danger">*</span>
            </label>
            <input
              id="input12"
              className="form-control"
              type="text"
              value={formData.rawMaterial.quantityAvailable ?? ""}
              readOnly={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default PurchaseForm;
