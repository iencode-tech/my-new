import React from "react";
import {
  statuses,
  unitMetric,
  filePathUrl,
} from "../../../../utils/appConstants";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileInput from "../../../common/fileInput/FileInput";
import TextInput from "../../../common/textInput/TextInput";

function RawMaterialForm({
  formData,
  listData,
  _handleOnChange,
  _fetchRawMaterials,
  formValidationData,
  _handleFormValidation,
}) {
  const _addElementToArray = (element, value) => {
    _handleOnChange(null, {
      [element]: [...formData.incompatibleRawMaterials, value],
    });
  };

  const _removeElementToArray = (e, element, value) => {
    e.preventDefault();
    let tmp = [...formData.incompatibleRawMaterials];
    const index = formData.incompatibleRawMaterials.indexOf(value);
    if (index > -1) {
      tmp.splice(index, 1);
      _handleOnChange(null, { [element]: tmp });
    }
  };

  return (
    <>
      {formData.id ? <input type="hidden" value={formData.id} /> : ""}
      <div className={`row`}>
        <div className={`col-sm-12 col-md-6 border-end`}>
          <div className="mb-3">
            <TextInput
              id="input1"
              type="text"
              placeholder="Barcode"
              name="barCode"
              isRequired={true}
              value={formData.barCode}
              onChange={_handleOnChange}
              validations={["require", "alphanumeric"]}
              formValidationData={formValidationData}
              _handleFormValidation={_handleFormValidation}
            />
          </div>

          <div className="mb-3">
            <TextInput
              id="input2"
              type="text"
              placeholder="Name"
              name="name"
              isRequired={true}
              value={formData.name}
              onChange={_handleOnChange}
              validations={["require", "alpha"]}
              formValidationData={formValidationData}
              _handleFormValidation={_handleFormValidation}
            />
          </div>

          <div className="mb-3">
            <TextInput
              id="input3"
              type="text"
              placeholder="Unit Value"
              name="unitValue"
              isRequired={true}
              value={formData.unitValue}
              onChange={_handleOnChange}
              validations={["require", "numeric"]}
              formValidationData={formValidationData}
              _handleFormValidation={_handleFormValidation}
            />
          </div>

          <div className={`row`}>
            <div className={`col-sm-12 col-md-6`}>
              <div className="mb-3">
                <label htmlFor="input4" className="form-label">
                  Unit Metric <span className="text-danger">*</span>
                </label>
                <select
                  id="input4"
                  className="form-select"
                  name="unitMetric"
                  value={formData.unitMetric}
                  onChange={_handleOnChange}
                >
                  {Object.keys(unitMetric).map((metric, index) => (
                    <option key={index} value={metric}>
                      {unitMetric[metric]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={`col-sm-12 col-md-6`}>
              <div className="mb-3">
                <TextInput
                  id="input5"
                  type="text"
                  placeholder="Presentation"
                  name="presentation"
                  isRequired={true}
                  value={formData.presentation}
                  onChange={_handleOnChange}
                  validations={["require", "alphaNumeric"]}
                  formValidationData={formValidationData}
                  _handleFormValidation={_handleFormValidation}
                />
              </div>
            </div>
          </div>

          <div className={`row`}>
            <div className={`col-sm-12 col-md-6`}>
              <div className="mb-3">
                <TextInput
                  id="input6"
                  type="text"
                  placeholder="Quantity"
                  name="quantity"
                  isRequired={true}
                  value={formData.quantity}
                  onChange={_handleOnChange}
                  validations={["require", "numeric"]}
                  formValidationData={formValidationData}
                  _handleFormValidation={_handleFormValidation}
                />
              </div>
            </div>
            <div className={`col-sm-12 col-md-6`}>
              <div className="mb-3">
                <TextInput
                  id="input7"
                  type="text"
                  placeholder="Available Quantity"
                  name="quantityAvailable"
                  isRequired={true}
                  value={formData.quantityAvailable}
                  onChange={_handleOnChange}
                  validations={["require", "float"]}
                  formValidationData={formValidationData}
                  _handleFormValidation={_handleFormValidation}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={`col-sm-12 col-md-6`}>
          <h5 className={`text-center`}>Data Reference</h5>
          <div className="mb-3">
            <TextInput
              id="input8"
              type="text"
              placeholder="Projected Price"
              name="price"
              value={formData.price}
              onChange={_handleOnChange}
              validations={["float"]}
              formValidationData={formValidationData}
              _handleFormValidation={_handleFormValidation}
            />
          </div>
          <div className="mb-3">
            <TextInput
              id="input9"
              type="text"
              placeholder="Supplier"
              name="supplier"
              isRequired={true}
              value={formData.supplier}
              onChange={_handleOnChange}
              validations={["required", "alphaNumeric"]}
              formValidationData={formValidationData}
              _handleFormValidation={_handleFormValidation}
            />
          </div>
          <div className="mb-3">
            <TextInput
              id="input10"
              type="text"
              placeholder="Presentation"
              name="refPresentation"
              isRequired={true}
              value={formData.refPresentation}
              onChange={_handleOnChange}
              validations={["required", "alpha"]}
              formValidationData={formValidationData}
              _handleFormValidation={_handleFormValidation}
            />
          </div>
        </div>
      </div>

      <hr />

      <FileInput
        id="input11"
        name="files"
        isMultiple
        accept="application/pdf"
        label="Data Sheet"
        existingFiles={formData.files}
        _onChange={_handleOnChange}
        fileUrl={filePathUrl.rawMaterials}
      />

      <hr />

      <h5 className={`text-center`}>Care</h5>
      <div className={`row`}>
        <div className={`col-sm-12 col-md-6`}>
          <div className="mb-3">
            <TextInput
              id="input12"
              type="text"
              placeholder="Retirement Time"
              name="retirementTime"
              isRequired={true}
              value={formData.retirementTime}
              onChange={_handleOnChange}
              validations={["numeric"]}
              formValidationData={formValidationData}
              _handleFormValidation={_handleFormValidation}
            />
          </div>
        </div>
        <div className={`col-sm-12 col-md-6`}>
          <div className="mb-3">
            <TextInput
              id="input13"
              type="text"
              placeholder="Quarantine Before Harvest"
              name="quarantine"
              isRequired={true}
              value={formData.quarantine}
              onChange={_handleOnChange}
              validations={["numeric"]}
              formValidationData={formValidationData}
              _handleFormValidation={_handleFormValidation}
            />
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
            <div className={`col-6`}>
              <ul className={`list-group`}>
                <li className={`list-group-item`}>
                  <input
                    className="form-control"
                    type="text"
                    onChange={(e) => _fetchRawMaterials(e.currentTarget.value)}
                  />
                </li>
                {listData.map(
                  (listElement, index) =>
                    formData.incompatibleRawMaterials.indexOf(
                      listElement.id
                    ) === -1 &&
                    formData.id !== listElement.id && (
                      <li
                        key={index}
                        className={`list-group-item list-group-item-action`}
                        onClick={() =>
                          _addElementToArray(
                            "incompatibleRawMaterials",
                            listElement.id
                          )
                        }
                      >
                        {listElement.name}
                      </li>
                    )
                )}
              </ul>
            </div>
            <div className={`col-6`}>
              <select
                className={`d-none`}
                name={`incompatibleRawMaterials`}
                multiple
                value={formData.incompatibleRawMaterials}
                onChange={_handleOnChange}
              >
                {listData.map((listElement, index) => (
                  <option key={index} value={listElement.id}>
                    {listElement.name}
                  </option>
                ))}
              </select>
              <ul className={`list-group`}>
                {listData.map(
                  (listElement, index) =>
                    formData.incompatibleRawMaterials.indexOf(listElement.id) >
                      -1 && (
                      <li
                        key={index}
                        className={`list-group-item list-group-item-action`}
                      >
                        {listElement.name}
                        <button
                          className={`btn btn-sm btn-toolbar btn-danger float-end`}
                          onClick={(e) =>
                            _removeElementToArray(
                              e,
                              "incompatibleRawMaterials",
                              listElement.id
                            )
                          }
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
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

export default RawMaterialForm;
