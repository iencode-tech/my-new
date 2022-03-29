import React, { useEffect, useState } from "react";
import { unitMetric } from "../../../../../../utils/appConstants";
import Table from "../../../../../common/table/Table";

function RawMaterialView({ formData }) {
  const [fdDefVal, setFdDefVal] = useState(1000);

  const _checkFolialDrenche = () =>
    [0, 2].indexOf(parseInt(formData.method)) > -1;

  const _checkManual = () => parseInt(formData.method) === 1;

  const _calculateQtyTree = (rawMaterialData) => {
    return rawMaterialData.quantity || 0;
  };

  const _getRemaining = () => {
    let remainingTotal = 0;
    if (formData.rawMaterials && formData.rawMaterials.length > 0) {
      for (let i = 1; i < formData.rawMaterials.length; i++) {
        remainingTotal += parseFloat(formData.rawMaterials[i].quantity) || 0;
      }
    }
    return remainingTotal;
  };

  useEffect(() => {
    if (
      _checkFolialDrenche() &&
      formData.rawMaterials &&
      formData.rawMaterials.length > 0
    ) {
      let remainingTotal = 0;
      for (let i = 0; i < formData.rawMaterials.length; i++) {
        remainingTotal += parseFloat(formData.rawMaterials[i].quantity) || 0;
      }
      setFdDefVal(remainingTotal);
    }
  });

  return (
    <div className="mb-3">
      <div className="row">
        <div className="col-12 border border-2 rounded">
          <h6 className={`text-center text-bold`}>Amount to Dose</h6>
          <Table
            data={
              formData.rawMaterials &&
              formData.rawMaterials.map((rawMaterial, index) => ({
                name: rawMaterial.rawMaterial.name,
                quantity:
                  _checkFolialDrenche() && index === 0
                    ? fdDefVal
                    : rawMaterial.quantity,
                unit: unitMetric[rawMaterial.unit],
                ...(_checkManual()
                  ? {
                      qtyTree: `${_calculateQtyTree(rawMaterial)} ${
                        unitMetric[rawMaterial.unit]
                      }`,
                    }
                  : {}),
                ...(_checkFolialDrenche()
                  ? {
                      qtyLts:
                        index !== 0
                          ? `${_calculateQtyTree(rawMaterial)} ${
                              unitMetric[rawMaterial.unit]
                            }`
                          : "",
                      total:
                        index === 0 &&
                        `${rawMaterial.quantity} ${
                          unitMetric[rawMaterial.unit]
                        }`,
                    }
                  : {}),
              }))
            }
            header={[
              "Material",
              "Quantity",
              "Unit",
              ...(_checkManual() ? ["Qty x Tree"] : []),
              ...(_checkFolialDrenche() ? ["Qty x Lts.", "Total"] : []),
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default RawMaterialView;
