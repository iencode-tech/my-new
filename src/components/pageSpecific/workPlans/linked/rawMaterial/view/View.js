import React from "react";
import Table from "../../../../../common/table/Table";
import {
  workPlanMethods,
  unitMetric,
} from "../../../../../../utils/appConstants";

function RawMaterialView({ formData, _checkFolialDrenche, _checkManual }) {
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
        (parseFloat(rawMaterial.quantity) / 1000) *
        (parseFloat(workPlanMethods[parseInt(formData.methodId)].value) / 1000);
    });

    return totalQ === 0 ? 0 : Math.floor(totalQ);
  };

  return (
    <div className="mb-3">
      <div className="row">
        <div className="border border-2 rounded">
          <Table
            data={[
              ...formData.rawMaterials.map((rawMaterial, index) => ({
                name: rawMaterial.rawMaterial.name,
                quantity: `${rawMaterial.quantity} ${
                  unitMetric[rawMaterial.unit]
                }`,
                quantityAvailable: `${
                  rawMaterial.rawMaterial.quantityAvailable
                } ${unitMetric[rawMaterial.unit]}`,
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
                changedQuantity: rawMaterial.changedQuantity,
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
            ]}
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
  );
}

export default RawMaterialView;
