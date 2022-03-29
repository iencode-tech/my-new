import React from "react";
import { methods, workPlanMethods } from "../../../../utils/appConstants";
import SelectDynamic from "../../../common/select/Select";
import RawMaterialForm from "../linked/rawMaterial/form/Form.js";

function WorkPlanForm({
  formData,
  _handleOnChange,
  collaborators,
  _fetchAllCollaborators,
  zones,
  _fetchAllZones,
  sectors,
  _fetchAllSectors,
  agriculturalPractices,
  _fetchAllAgriculturalPractices,
}) {
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
        <SelectDynamic
          id="input2"
          value={
            formData.collaborator && formData.collaborator.id
              ? {
                  value: formData.collaborator.id,
                  label: formData.collaborator.name,
                }
              : null
          }
          name="collaboratorId"
          options={collaborators.map((collaborator) => ({
            value: collaborator.id,
            label: collaborator.name,
          }))}
          onInputChange={_fetchAllCollaborators}
          onChange={(e) => {
            _handleOnChange(e);
            _handleOnChange({
              currentTarget: {
                name: "collaborator",
                value:
                  collaborators[
                    collaborators
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

      <div className="mb-3">
        <label htmlFor="" className="form-label">
          Choose Zone/Sector <span className="text-danger">*</span>
        </label>
        <div className="input-group pb-2">
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="radio"
              name="selectRegion"
              value="Z"
              aria-label="Zone"
              checked={formData.selectRegion === "Z"}
              onChange={_handleOnChange}
            />{" "}
            &nbsp; Zone
          </div>
          <SelectDynamic
            className="form-control"
            disabled={formData.selectRegion !== "Z"}
            value={
              formData.zone && formData.zone.id
                ? {
                    value: formData.zone.id,
                    label: formData.zone.name,
                  }
                : null
            }
            name="zoneId"
            aria-label="Select a Zone"
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
          />
        </div>
        <div className="input-group pt-2">
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="radio"
              name="selectRegion"
              value="S"
              aria-label="Sector"
              checked={formData.selectRegion === "S"}
              onChange={_handleOnChange}
            />{" "}
            &nbsp; Sector
          </div>
          <SelectDynamic
            className="form-control"
            disabled={formData.selectRegion !== "S"}
            value={
              formData.sector && formData.sector.id
                ? {
                    value: formData.sector.id,
                    label: formData.sector.name,
                  }
                : null
            }
            name="sectorId"
            aria-label="Select a Sector"
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
                  value:
                    sectors[
                      sectors
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
      </div>

      <div className="mb-3">
        <label htmlFor="input2" className="form-label">
          Agricultural Practice <span className="text-danger">*</span>
        </label>
        <SelectDynamic
          id="input2"
          value={
            formData.agriculturalPractice && formData.agriculturalPractice.id
              ? {
                  value: formData.agriculturalPractice.id,
                  label: formData.agriculturalPractice.formulationName,
                }
              : null
          }
          name="agriculturalPracticeId"
          options={agriculturalPractices.map((agriculturalPractice) => ({
            value: agriculturalPractice.id,
            label: agriculturalPractice.formulationName,
          }))}
          onInputChange={_fetchAllAgriculturalPractices}
          onChange={(e) => {
            const aP =
              agriculturalPractices[
                agriculturalPractices
                  .map(function (e) {
                    return e.id;
                  })
                  .indexOf(e.currentTarget.value)
              ];
            const rM = [];
            aP.rawMaterials.forEach((element) => {
              rM.push({
                rawMaterialId: element.rawMaterialId,
                quantity: element.quantity,
                unit: element.unit,
                rawMaterial: element.rawMaterial,
                changedQuantity: "",
              });
            });
            _handleOnChange(e);
            _handleOnChange({
              currentTarget: {
                name: "methodId",
                value: 0,
              },
            });
            _handleOnChange({
              currentTarget: {
                name: "amountPerTree",
                value: 0,
              },
            });
            _handleOnChange({
              currentTarget: {
                name: "agriculturalPractice",
                value: aP,
              },
            });
            _handleOnChange({
              currentTarget: {
                name: "rawMaterials",
                value: rM,
              },
            });
          }}
        />
      </div>

      {_checkFolialDrenche() && (
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="input9" className="form-label">
              Method <span className="text-danger">*</span>
            </label>
            <select
              id="input9"
              className="form-select"
              name="methodId"
              onChange={_handleOnChange}
              value={parseInt(formData.methodId)}
            >
              {Object.keys(workPlanMethods).map((workPlanMethod, index) => (
                <option key={index} value={workPlanMethod}>
                  {workPlanMethods[workPlanMethod].name}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            <label htmlFor="input10" className="form-label">
              Amount Per Tree <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <input
                id="input10"
                className="form-control"
                name="amountPerTree"
                onChange={_handleOnChange}
                value={formData.amountPerTree}
              />
              <div className="input-group-append">
                <span className="input-group-text">Lts.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {formData.agriculturalPractice &&
        formData.zone &&
        Object.keys(formData.agriculturalPractice).length > 0 &&
        Object.keys(formData.zone).length > 0 && (
          <div className="mb-3 card">
            <div className="card-header">
              <h6 className="fw-bold">
                DOSAGE :: {formData.agriculturalPractice.formulationName}
              </h6>
            </div>
            <div className="card-body">
              <div className="row mb-3 text-center">
                <div className="col-3">
                  <span className="fw-bold">Total Trees: </span>
                  {formData.id ? formData.totalTrees : formData.zone.treeCount}
                </div>
                <div className="col-3">
                  <span className="fw-bold">Method: </span>
                  {methods[parseInt(formData.agriculturalPractice.method)]}
                </div>
                {_checkFolialDrenche() && (
                  <div className="col-3">
                    <span className="fw-bold">Quantity X Tree: </span>
                    {formData.amountPerTree}
                  </div>
                )}
                {_checkFolialDrenche() && (
                  <div className="col-3">
                    <span className="fw-bold">&nbsp;</span>
                    {`${workPlanMethods[parseInt(formData.methodId)].name}`}
                  </div>
                )}
              </div>

              <RawMaterialForm
                formData={formData}
                _handleOnChange={_handleOnChange}
                _checkFolialDrenche={_checkFolialDrenche}
                _checkManual={_checkManual}
              />
            </div>
          </div>
        )}
    </>
  );
}

export default WorkPlanForm;
