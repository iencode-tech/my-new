import React from "react";
import Table from "../../../../../common/table/Table";
import {
  workPlanMethods,
  unitMetric,
} from "../../../../../../utils/appConstants";

function RawMaterialForm({
  formData,
  _handleOnChange,
  _checkFolialDrenche,
  _checkManual,
}) {
  const _getAmountPerTree = () => {
    let amountPerTree = 1;
    if (formData.amountPerTree && formData.amountPerTree !== 0) {
      amountPerTree = parseFloat(formData.amountPerTree);
    }
    return amountPerTree;
  };

  const _calculateTotalBasedOnMethod = () => {
    let totalQ = 0;
    formData.rawMaterials.forEach((rawMaterial) => {
      totalQ +=
        parseFloat(rawMaterial.quantity / 1000) *
        parseFloat(workPlanMethods[parseInt(formData.methodId)].value / 1000);
    });

    return totalQ === 0 ? 0 : Math.floor(totalQ);
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row">
          <div className="border border-2 rounded">
            <Table
              data={
                formData.rawMaterials && [
                  ...formData.rawMaterials.map((rawMaterial, index) => ({
                    name: rawMaterial.rawMaterial.name,
                    quantity: `${rawMaterial.quantity} ${
                      unitMetric[rawMaterial.unit]
                    }`,
                    quantityAvailable:
                      (_checkFolialDrenche() && index !== 0) ||
                      _checkManual() ? (
                        <span
                          className={
                            rawMaterial.rawMaterial.quantityAvailable <
                            rawMaterial.quantity
                              ? "text-danger"
                              : ""
                          }
                        >{`${rawMaterial.rawMaterial.quantityAvailable} ${
                          unitMetric[rawMaterial.unit]
                        }`}</span>
                      ) : (
                        ""
                      ),
                    ...(_checkFolialDrenche()
                      ? {
                          totalMethodBased: `${
                            (rawMaterial.quantity / 1000) *
                            (workPlanMethods[parseInt(formData.methodId)].value / 1000)
                          }` + ' ' + workPlanMethods[parseInt(formData.methodId)].totalunit,
                        }
                      : {}),
                    ...(_checkManual()
                      ? {
                          totalTree: `${
                            rawMaterial.quantity *
                            (formData.id
                              ? formData.totalTrees
                              : formData.zone.treeCount)
                          } ${unitMetric[rawMaterial.unit]}`,
                        }
                      : {}),
                    changedQuantity:
                      (_checkFolialDrenche() && index !== 0) ||
                      _checkManual() ? (
                        <input
                          type="text"
                          name="changedQuantity"
                          value={rawMaterial.changedQuantity || ""}
                          onChange={(e) =>
                            _handleOnChange(e, ["rawMaterials", index])
                          }
                        />
                      ) : (
                        ""
                      ),
                  })),
                  ...(_checkFolialDrenche()
                    ? [
                        {
                          name: "",
                          quantity: "",
                          quantityAvailable: "Total:",
                          totalMethodBased: `${_calculateTotalBasedOnMethod()} ${
                            unitMetric["totalunit"]
                          }`,
                          changedQuantity: "",
                        },
                      ]
                    : []),
                ]
              }
              header={[
                "Material",
                "Quantity",
                "Quantity Available",
                ...(_checkFolialDrenche()
                  ? [
                      `Total X ${
                        workPlanMethods[parseInt(formData.methodId)].actualName
                      }`,
                    ]
                  : []),
                ...(_checkManual() ? ["Total"] : []),
                "Change Quantity",
              ]}
            />
            {_checkFolialDrenche() && (
              <>
              <h4 className="text-secondary text-center pt-2">
                You will need to prepare{" "}
                {(
                  (formData.totalTrees * formData.amountPerTree) /
                    (workPlanMethods[parseInt(formData.methodId)].value / 1000)
                )}{" "}
                {workPlanMethods[parseInt(formData.methodId)].actualName} of{" "}
                {workPlanMethods[parseInt(formData.methodId)].value / 1000} Lts
                to cover{" "}
                {formData.id ? formData.totalTrees : formData.zone.treeCount}{" "}
                trees
              </h4>

              <h6 className="text-secondary text-center pt-2">
                ({formData.totalTrees} trees * {formData.amountPerTree} Lts ) / {workPlanMethods[parseInt(formData.methodId)].value / 1000} Lts  = {(formData.totalTrees * formData.amountPerTree) / (workPlanMethods[parseInt(formData.methodId)].value / 1000)} {workPlanMethods[parseInt(formData.methodId)].actualName}
              </h6>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RawMaterialForm;
