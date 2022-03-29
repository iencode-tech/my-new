import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { statuses } from "../../../../utils/appConstants";
import TextInput from "../../../common/textInput/TextInput";
import { useDispatch, useSelector } from "react-redux";
import {
  initFormData,
  deleteData,
  fetchList,
  handleListFormDataChange,
  selectTree,
} from "../../../../store/redux/Page/Tree";
import Pagination from "../../../../components/common/pagination/Pagination";

function SectorForm({
  formData,
  _handleOnChange,
  trees,
  _fetchAllTrees,
  illnesses,
  _fetchAllIllnesses,
  formValidationData,
  _handleFormValidation,
}) {
  const store = useSelector(selectTree);
  const dispatch = useDispatch();
  const page = {
    current: 1
  };

  const _addSelection = (tree) => {
    _handleOnChange({
      currentTarget: {
        name: "treeIds",
        value: [...formData.treeIds, tree.id],
      },
    });
    _handleOnChange({
      currentTarget: {
        name: "treeData",
        value: [...formData.treeData, tree],
      },
    });
  };

  const _removeSelection = (treeId, index) => {
    let updatedTreeIds = [...formData.treeIds];
    updatedTreeIds.splice(updatedTreeIds.indexOf(treeId), 1);
    _handleOnChange({
      currentTarget: {
        name: "treeIds",
        value: updatedTreeIds,
      },
    });
    let updatedTreeData = [...formData.treeData];
    updatedTreeData.splice(index, 1);
    _handleOnChange({
      currentTarget: {
        name: "treeData",
        value: updatedTreeData,
      },
    });
  };

  const _handlePageChange = (page = 1) => {
    dispatch(
      handleListFormDataChange({
        key: "page",
        value: page,
      })
    );
    dispatch(fetchList({ ...store.listFormData, page }));
  };

  return (
    <>
      {formData.id ? <input type="hidden" value={formData.id} /> : ""}
      <div className="row mb-3">
        {/* <div className="col-sm-12 col-md-6">
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
        </div> */}
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

      <div className="mb-3">
        <label htmlFor="input2" className="form-label">
          Status <span className="text-danger">*</span>
        </label>
        <select
          id="input2"
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

      <div className="mb-3">
        <label htmlFor="input3" className="form-label">
          Create By <span className="text-danger">*</span>
        </label>
        <div className="form-control">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="createBy"
              id="radioCreateById"
              value="id"
              checked={formData.createBy === "id"}
              onChange={_handleOnChange}
            />
            <label className="form-check-label" htmlFor="radioCreateById">
              Id
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="createBy"
              id="radioCreateByIllness"
              value="illness"
              checked={formData.createBy === "illness"}
              onChange={_handleOnChange}
            />
            <label className="form-check-label" htmlFor="radioCreateByIllness">
              Illness
            </label>
          </div>
        </div>
      </div>

      {formData.createBy === "id" && (
        <div className="row">
          <div className="col-2">
            <div className="card">
              <div className="card-header">
                <h4>Trees</h4>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Keyword"
                  onChange={(e) => _fetchAllTrees(e.currentTarget.value)}
                />
              </div>





              <div className="card-body" style={{ minHeight: 300, textAlign: "center" }}>

                <div className="card-footer clearfix">
                  <Pagination
                    totalCount={parseInt(store.listCount)}
                    currentPage={parseInt(store.listFormData.page)}
                    onPageChange={_handlePageChange}
                  />
                </div>


                <div className="list-group" style={{ textAlign: "center" }}>
                  {store.list
                    .filter((tree) => formData.treeIds.indexOf(tree.id) === -1)
                    .map((tree, index) => (
                      <div
                        className="list-group-item list-group-item-action" style={{ textAlign: "center" }}
                        key={index}
                        onClick={(e) => {
                          _addSelection(tree);
                        }}
                      >
                        <div className="d-flex w-200 justify-content-between" style={{ textAlign: "center" }}>
                          <p className="mb-1">{tree.scanId}</p>
                        </div>
                      </div>
                    ))}
                </div>





                <div className="card-footer clearfix">
                  <Pagination
                    totalCount={parseInt(store.listCount)}
                    currentPage={parseInt(store.listFormData.page)}
                    onPageChange={_handlePageChange}
                  />
                </div>




              </div>
            </div>
          </div>
          <div className="col-10">
            <div className="card">
              <div className="card-header">
                <h4>Selected Trees</h4>
              </div>
              <div className="card-body" style={{ minHeight: 300 }}>
                <div className="row list-group">
                  <div className="col-12 list-group-item">
                    <div className="container">
                      {formData.treeIds.length === 0 && (
                        <div
                          className="row align-items-center text-center"
                          style={{ minHeight: 300 }}
                        >
                          <div className="col-md-12">
                            <FontAwesomeIcon icon={faPlus} />
                            <h5>Click on the trees to add to the selector</h5>
                          </div>
                        </div>
                      )}
                      {formData.treeData.length > 0 && (
                        <div className="row" style={{ minHeight: 300 }}>
                          {formData.treeData.map((tree, index) => (
                            <div className="col" key={index}>
                              <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  _removeSelection(tree.id, index);
                                }}
                              >
                                {tree.scanId}
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {formData.createBy === "illness" && (
        <div className="row">
          <div className="col-5">
            <div className="card">
              <div className="card-header">
                <h4>Illnesses</h4>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Keyword"
                  onChange={(e) => _fetchAllIllnesses(e.currentTarget.value)}
                />
              </div>
              <div className="card-body">
                <div
                  id="illnessAccordion"
                  className="accordion accordion-flush"
                  style={{ minHeight: 300 }}
                >
                  {illnesses.map((illness, index) => (
                    <div className="accordion-item" key={index}>
                      <h2
                        className="accordion-header"
                        id={`illness-flush-heading${index}`}
                      >
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#illness-flush-collapse${index}`}
                          aria-expanded="false"
                          aria-controls={`#illness-flush-collapse${index}`}
                        >
                          {illness.name}
                        </button>
                      </h2>
                      <div
                        id={`illness-flush-collapse${index}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`illness-flush-heading${index}`}
                        data-bs-parent="#illnessAccordion"
                      >
                        <div className="accordion-body">
                          <div className="list-group">
                            {illness.treeData
                              .filter(
                                (tree) =>
                                  formData.treeIds.indexOf(tree.id) === -1
                              )
                              .map((tree, index) => (
                                <div
                                  className="list-group-item list-group-item-action"
                                  key={index}
                                  onClick={(e) => {
                                    _addSelection(tree);
                                  }}
                                >
                                  <div className="d-flex w-100 justify-content-between">
                                    <p className="mb-1">{tree.scanId}</p>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-7">
            <div className="card">
              <div className="card-header">
                <h4>Selected Trees</h4>
              </div>
              <div className="card-body">
                <div className="list-group" style={{ minHeight: 300 }}>
                  <div className="list-group-item">
                    <div className="container">
                      {formData.treeIds.length === 0 && (
                        <div
                          className="row align-items-center text-center"
                          style={{ minHeight: 300 }}
                        >
                          <div className="col-md-12">
                            <FontAwesomeIcon icon={faPlus} />
                            <h5>Click trees to add to the selector</h5>
                          </div>
                        </div>
                      )}
                      {formData.treeIds.length > 0 && (
                        <div className="row" style={{ minHeight: 300 }}>
                          {formData.treeData.map((tree, index) => (
                            <div className="col" key={index}>
                              <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  _removeSelection(tree.id, index);
                                }}
                              >
                                {tree.scanId}
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SectorForm;
