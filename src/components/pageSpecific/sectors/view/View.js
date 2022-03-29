import React from "react";
import { statuses } from "../../../../utils/appConstants";

function SectorView({ formData }) {
  return (
    <>
      <div className="mb-3">
        <label htmlFor="input1" className="form-label">
          Name
        </label>
        <span id="input1" className="form-control">
          {formData.name}
        </span>
      </div>

      <div className="mb-3">
        <label htmlFor="input2" className="form-label">
          Status
        </label>
        <span id="input2" className="form-control">
          {statuses[parseInt(formData.status)]}
        </span>
      </div>

      <div className="row">
        <div className="col-12">
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
                          <h5>No Trees in the Sector</h5>
                        </div>
                      </div>
                    )}
                    {formData.treeData.length > 0 && (
                      <div className="row" style={{ minHeight: 300 }}>
                        {formData.treeData.map((tree, index) => (
                          <div className="col" key={index}>
                            <span className="btn btn-outline-secondary">
                              {tree.scanId}
                            </span>
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
    </>
  );
}

export default SectorView;
