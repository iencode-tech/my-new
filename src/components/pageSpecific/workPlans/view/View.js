import React from "react";
import Table from "../../../common/table/Table";
import { methods, workPlanMethods } from "../../../../utils/appConstants";
import RawMaterialView from "../linked/rawMaterial/view/View";

function WorkPlanDataView({ formData }) {
  const _checkFolialDrenche = () =>
    [0, 2].indexOf(parseInt(formData.agriculturalPractice.method)) > -1;

  const _checkManual = () =>
    parseInt(formData.agriculturalPractice.method) === 1;

  return (
    <>
      {formData.id ? <input type="hidden" value={formData.id} /> : ""}
      <div className="mb-3">
        <label htmlFor="input2" className="form-label">
          Collaborator <span className="text-danger">*</span>
        </label>
        <span id="input2" className="form-control">
          {formData.collaborator.name}
        </span>
      </div>

      {formData.selectRegion === "Z" && (
        <div className="mb-3">
          <label htmlFor="input3" className="form-label">
            Zone <span className="text-danger">*</span>
          </label>
          <span id="input3" className="form-control">
            {formData.zone.name}
          </span>
        </div>
      )}

      {formData.selectRegion === "S" && (
        <div className="mb-3">
          <label htmlFor="input4" className="form-label">
            Sector <span className="text-danger">*</span>
          </label>
          <span id="input4" className="form-control">
            {formData.sector.name}
          </span>
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="input5" className="form-label">
          Agricultural Practice <span className="text-danger">*</span>
        </label>
        <span id="input5" className="form-control">
          {formData.agriculturalPractice.formulationName}
        </span>
      </div>

      <div className="mb-3">
        <label htmlFor="input9" className="form-label">
          Method <span className="text-danger">*</span>
        </label>
        <span id="input9" className="form-control">
          {workPlanMethods[parseInt(formData.methodId)].name}
        </span>
      </div>

      {_checkFolialDrenche() && (
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="input9" className="form-label">
              Method <span className="text-danger">*</span>
            </label>
            <span id="input9" className="form-control">
              {workPlanMethods[parseInt(formData.methodId)].name}
            </span>
          </div>
          <div className="col">
            <label htmlFor="input10" className="form-label">
              Amount Per Tree <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <span id="input10" className="form-control">
                {formData.amountPerTree}
              </span>
              <div className="input-group-append">
                <span className="input-group-text">Lts.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-3 card">
        <div className="card-header">
          <h6 className="fw-bold">
            DOSAGE :: {formData.agriculturalPractice.formulationName}
          </h6>
        </div>
        <div className="card-body">
          <div className="row mb-3 text-center">
            <div className="col-4">
              <span className="fw-bold">Total Trees: </span>
              {formData.id ? formData.totalTrees : formData.zone.treeCount}
            </div>
            <div className="col-4">
              <span className="fw-bold">Method: </span>
              {methods[parseInt(formData.agriculturalPractice.method)]}
            </div>
            {_checkFolialDrenche() && (
              <div className="col-4">
                <span className="fw-bold">&nbsp;</span>
                {`${workPlanMethods[parseInt(formData.methodId)].name}`}
              </div>
            )}
          </div>

          {formData.rawMaterials && (
            <RawMaterialView
              formData={formData}
              _checkFolialDrenche={_checkFolialDrenche}
              _checkManual={_checkManual}
            />
          )}

          {formData.trees &&
            formData.trees.length > 0 &&
            Object.keys(formData.trees[0]).length > 0 && (
              <div className="mb-3">
                <div className="row">
                  <div className="border border-2 rounded">
                    <Table
                      data={formData.trees.map((tree, index) => ({
                        scanId: tree.treeData.scanId,
                        observation: tree.observation,
                        scannedOn: tree.scannedOn,
                      }))}
                      header={["Tree Scan Id", "Observation", "Scanned On"]}
                    />
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </>
  );
}

export default WorkPlanDataView;
