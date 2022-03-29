import React, { useEffect } from "react";
import "./ArcGis.scss";
import Breadcrumb from "../../components/common/breadcrumb/Breadcrumb";

function ArcGis() {
  const pageName = "ArcGis";
  const routeStart = "/arcgis";
  const breadCrumbs = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "ArcGis",
      link: "",
    },
  ];

  useEffect(() => {
    document.title = `${process.env.REACT_APP_NAME} | ${pageName}`;
  }, []);
  return (
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <div id="arcgis" className="col-12 p-0 content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">{pageName}</h1>
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
              <iframe
                src="https://paulasanchezr.github.io/ElCateo_map/"
                title="description"
                frameBorder="0"
                width={"100%"}
                height={"100%"}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ArcGis;
