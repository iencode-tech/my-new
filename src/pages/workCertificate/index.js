import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo, faSearch } from "@fortawesome/free-solid-svg-icons";
import "./WorkCertificate.scss";
import Breadcrumb from "../../components/common/breadcrumb/Breadcrumb";
import Table from "../../components/common/table/Table";
import SelectDynamic from "../../components/common/select/Select";
import { PDFViewer } from "@react-pdf/renderer";
import {
  initFormData,
  fetchList,
  handleListFormDataChange,
  selectWorkCertificate,
  fetchAllZones,
  fetchAllSectors,
  setSelectedData,
  readData,
} from "../../store/redux/Page/WorkCertificate";
import { utcToLocalTime } from "../../utils/timeHelper";
import WorkCertificate from "../../components/pageSpecific/workPlans/certificate/Certificate";

function WorkCertificates() {
  const store = useSelector(selectWorkCertificate);
  const dispatch = useDispatch();
  const pageName = "Work Certificates";
  const routeStart = "/work-certificates";
  const breadCrumbs = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Work Certificates",
      link: "",
    },
  ];

  const tableHeads = ["Certificates"];

  const _handleOnChange = (e) => {
    dispatch(
      handleListFormDataChange({
        key: e.currentTarget.name,
        value: e.currentTarget.value,
      })
    );
  };

  const _setSelectedData = (key, value) => {
    dispatch(setSelectedData({ key, value }));
  };

  const _fetchAllZones = (keyword = "") => {
    dispatch(fetchAllZones({ ...store.zonesFormData, keyword }));
  };

  const _fetchAllSectors = (keyword = "") => {
    dispatch(fetchAllSectors({ ...store.sectorsFormData, keyword }));
  };

  const _handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchList(store.listFormData));
  };

  const _refreshListing = (e) => {
    const form = e.currentTarget.closest("form");
    const inputs = form.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
      dispatch(handleListFormDataChange({ key: inputs[i].name, value: "" }));
    }
    _handleFormSubmit(e);
  };

  const _loadWorkPlanData = (e, id, fileName) => {
    e.preventDefault();
    dispatch(readData({ id }));
  };

  useEffect(() => {
    document.title = `${process.env.REACT_APP_NAME} | ${pageName}`;
    dispatch(initFormData());
    _fetchAllZones();
    _fetchAllSectors();
  }, []);

  return (
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <div className="col-12 p-0 content-wrapper">
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
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header border-transparent">
                    <div className={"row"}>
                      <form
                        name={`${pageName}ListFilter`}
                        onSubmit={_handleFormSubmit}
                      >
                        <div className="row mt-3 mb-3">
                          <div className="col-3">
                            <SelectDynamic
                              hideLabel={true}
                              value={
                                store.zone && store.zone.id
                                  ? {
                                      value: store.zone.id,
                                      label: store.zone.name,
                                    }
                                  : null
                              }
                              name="zoneId"
                              aria-label="Select a Zone"
                              options={store.zones.map((zone) => ({
                                value: zone.id,
                                label: zone.name,
                              }))}
                              onInputChange={_fetchAllZones}
                              onChange={(e) => {
                                _handleOnChange(e);
                                _setSelectedData(
                                  "zone",
                                  store.zones[
                                    store.zones
                                      .map(function (e) {
                                        return e.id;
                                      })
                                      .indexOf(e.currentTarget.value)
                                  ]
                                );
                                _handleOnChange({
                                  currentTarget: {
                                    name: "sectorId",
                                    value: "",
                                  },
                                });
                                _setSelectedData("sector", {});
                              }}
                            />
                          </div>
                          <div className="col-3">
                            <SelectDynamic
                              hideLabel={true}
                              value={
                                store.sector && store.sector.id
                                  ? {
                                      value: store.sector.id,
                                      label: store.sector.name,
                                    }
                                  : null
                              }
                              name="sectorId"
                              aria-label="Select a Sector"
                              options={store.sectors.map((sector) => ({
                                value: sector.id,
                                label: sector.name,
                              }))}
                              onInputChange={_fetchAllSectors}
                              onChange={(e) => {
                                _handleOnChange(e);
                                _setSelectedData(
                                  "sector",
                                  store.sectors[
                                    store.sectors
                                      .map(function (e) {
                                        return e.id;
                                      })
                                      .indexOf(e.currentTarget.value)
                                  ]
                                );
                                _handleOnChange({
                                  currentTarget: { name: "zoneId", value: "" },
                                });
                                _setSelectedData("zone", {});
                              }}
                            />
                          </div>
                          <div className="col-2">
                            <input
                              className="form-control"
                              type="date"
                              name="startDate"
                              onChange={_handleOnChange}
                              value={utcToLocalTime(
                                store.listFormData.startDate,
                                "YYYY-MM-DD"
                              )}
                            />
                          </div>
                          <div className="col-2">
                            <input
                              className="form-control"
                              type="date"
                              name="endDate"
                              onChange={_handleOnChange}
                              value={utcToLocalTime(
                                store.listFormData.endDate,
                                "YYYY-MM-DD"
                              )}
                            />
                          </div>
                          <div className="col-2">
                            <button
                              className="btn btn-outline-app"
                              type="submit"
                            >
                              <FontAwesomeIcon icon={faSearch} />
                            </button>
                            <button
                              className="btn btn-outline-app"
                              type="reset"
                              onClick={_refreshListing}
                            >
                              <FontAwesomeIcon icon={faRedo} />
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="card-body p-0">
                    <Table
                      data={store.list.map((listData, index) => ({
                        collaborator: (
                          <button
                            className="btn btn-link"
                            disabled={store.loading}
                            data-bs-toggle="modal"
                            data-bs-target="#filePreviewModal"
                            onClick={(e) =>
                              _loadWorkPlanData(
                                e,
                                listData.id,
                                `${
                                  listData.collaborator.firstName
                                }_${utcToLocalTime(
                                  listData.assignedOn,
                                  "MM-DD-YYYY"
                                )}`
                              )
                            }
                          >{`${
                            listData.collaborator.firstName
                          }_${utcToLocalTime(
                            listData.assignedOn,
                            "MM-DD-YYYY"
                          )}`}</button>
                        ),
                      }))}
                      header={tableHeads}
                    />
                  </div>

                  <div className="card-footer clearfix"></div>
                </div>
              </div>
            </div>
          </div>

          {/*Modal*/}
          <div
            className="modal fade"
            id="filePreviewModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="filePreviewModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="filePreviewModalLabel">
                    File Preview
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => dispatch(initFormData())}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="container-fluid">
                    <div className="row d-flex">
                      <div className="col-12 d-flex justify-content-center pdfPreviewer">
                        <PDFViewer>
                          <WorkCertificate formData={store.formData} />
                        </PDFViewer>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={() => dispatch(initFormData())}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default WorkCertificates;
