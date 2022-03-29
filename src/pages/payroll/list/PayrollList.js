import React, { useEffect } from "react";
import "./List.scss";
import Breadcrumb from "../../../components/common/breadcrumb/Breadcrumb";

function PayrollList() {
  const pageName = "PayRoll";
  const routeStart = "/tree";
  const breadCrumbs = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Payroll",
      link: "",
    },
  ];


  return (
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <div className="col-12 p-0 content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">
                  {pageName}&nbsp;
                </h1>
              </div>
              <div className="col-sm-6">
                <Breadcrumb breadCrumbs={breadCrumbs} />
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header border-transparent">
                    <div className="card-body p-0">
                      Processing Payroll
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default PayrollList;
