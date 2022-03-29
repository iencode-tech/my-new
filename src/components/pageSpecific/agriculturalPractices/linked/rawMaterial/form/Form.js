import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { unitMetric } from "../../../../../../utils/appConstants";
import Table from "../../../../../common/table/Table";

function RawMaterialForm({
  formData,
  listData,
  _handleOnChange,
  _addNewRawMaterial,
  _handleRemoveBtnClick,
  _fetchAllRawMaterials,
}) {
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
    if (_checkFolialDrenche() && formData.rawMaterials && formData.rawMaterials.length > 0) {
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
        <div className="col-2 border border-1 rounded">
          <h6 className={`text-center`}>Raw Materials</h6>
          <ul className="list-group">
            <li className="list-group-item">
              <input
                className="form-control"
                type="text"
                onChange={(e) => _fetchAllRawMaterials(e.currentTarget.value)}
              />
            </li>
            {listData
              .filter((material) => {
                let findFlag = false;
                formData.rawMaterials &&
                  formData.rawMaterials.forEach((fValue) => {
                    if (fValue.rawMaterialId === material.id) {
                      findFlag = true;
                    }
                  });
                return !findFlag;
              })
              .map((material, index) => (
                <li
                  key={index}
                  onClick={(e) => _addNewRawMaterial({ material }, e)}
                  className="list-group-item list-group-item-action"
                >
                  {material.name}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-10 border border-2 rounded">
          <h6 className={`text-center`}>Amount to Dose</h6>
          <Table
            data={
              formData.rawMaterials &&
              formData.rawMaterials.map((rawMaterial, index) => ({
                name: (
                  <>
                    <input
                      type="hidden"
                      name="rawMaterial"
                      value={rawMaterial.id}
                      onChange={(e) =>
                        _handleOnChange(e, ["rawMaterials", index])
                      }
                    />
                    {rawMaterial.rawMaterial.name}
                  </>
                ),
                quantity: (
                  <input
                    type="number"
                    name="quantity"
                    value={
                      _checkFolialDrenche() && index === 0
                        ? fdDefVal
                        : rawMaterial.quantity
                    }
                    onChange={(e) => {
                      if (_checkFolialDrenche() && index === 0) {
                        setFdDefVal(parseFloat(e.currentTarget.value));
                        _handleOnChange(
                          {
                            currentTarget: {
                              name: "quantity",
                              value:
                                parseFloat(e.currentTarget.value) -
                                _getRemaining(),
                            },
                          },
                          ["rawMaterials", index]
                        );
                      } else if (_checkFolialDrenche() && index > 0) {
                        _handleOnChange(e, ["rawMaterials", index]);
                        _handleOnChange(
                          {
                            currentTarget: {
                              name: "quantity",
                              value:
                                parseFloat(fdDefVal) -
                                (parseFloat(_getRemaining()) -
                                  parseFloat(rawMaterial.quantity || 0) +
                                  parseFloat(e.currentTarget.value || 0)),
                            },
                          },
                          ["rawMaterials", 0]
                        );
                      } else {
                        _handleOnChange(e, ["rawMaterials", index]);
                      }
                    }}
                  />
                ),
                unit: (
                  <select
                    name="unit"
                    value={rawMaterial.unit}
                    onChange={(e) =>
                      _handleOnChange(e, ["rawMaterials", index])
                    }
                    readOnly={true}
                    disabled={true}
                  >
                    {Object.keys(unitMetric).map((metric, index) => (
                      <option key={index} value={metric}>
                        {unitMetric[metric]}
                      </option>
                    ))}
                  </select>
                ),
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
                delete: ((_checkFolialDrenche() && index !== 0) ||
                  _checkManual()) && (
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={(e) => _handleRemoveBtnClick(index, e)}
                  />
                ),
              }))
            }
            header={[
              "Material",
              "Quantity",
              "Unit",
              ...(_checkManual() ? ["Qty x Tree"] : []),
              ...(_checkFolialDrenche() ? ["Qty x Lts.", "Total"] : []),
              "",
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default RawMaterialForm;
