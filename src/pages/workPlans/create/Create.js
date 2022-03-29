import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Create.scss";
import Breadcrumb from "../../../components/common/breadcrumb/Breadcrumb";
import {
  handleFormDataChange,
  handleFormValidation,
  initFormData,
  selectWorkPlan,
  storeData,
  fetchAllCollaborators,
  fetchAllZones,
  fetchAllSectors,
  fetchAllAgriculturalPractices,
} from "../../../store/redux/Page/WorkPlan";
import WorkPlanForm from "../../../components/pageSpecific/workPlans/form/Form";

function WorkPlanCreate() {
  const store = useSelector(selectWorkPlan);
  const dispatch = useDispatch();
  const pageName = "Add work plan";
  const breadCrumbs = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Work Plans",
      link: "/work-plans",
    },
    {
      name: "Add",
      link: "",
    },
  ];

  const _handleOnChange = (e, customPath) => {
    let keyName = e.currentTarget.name;
    if (Array.isArray(customPath) && customPath.length > 0) {
      keyName = [...customPath, e.currentTarget.name];
    } else {
      if (e.currentTarget.name === "selectRegion") {
        let newData = { key: "zoneId", value: "" };
        if (e.currentTarget.value === "Z") {
          newData = { key: "sectorId", value: "" };
        }
        dispatch(handleFormDataChange(newData));
      }
    }
    dispatch(
      handleFormDataChange({
        key: keyName,
        value: e.currentTarget.value,
      })
    );
  };

  const _handleFormValidation = (key, value) => {
    dispatch(
      handleFormValidation({
        key,
        value,
      })
    );
  };

  const _fetchAllCollaborators = (keyword = "") => {
    dispatch(
      fetchAllCollaborators({ ...store.collaboratorsFormData, keyword })
    );
  };

  const _fetchAllZones = (keyword = "") => {
    dispatch(fetchAllZones({ ...store.zonesFormData, keyword }));
  };

  const _fetchAllSectors = (keyword = "") => {
    dispatch(fetchAllSectors({ ...store.sectorsFormData, keyword }));
  };

  const _fetchAllAgriculturalPractices = (keyword = "") => {
    dispatch(
      fetchAllAgriculturalPractices({
        ...store.agriculturalPracticesFormData,
        keyword,
      })
    );
  };

  const _handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(storeData(store.formData));
  };

  useEffect(() => {
    document.title = `${process.env.REACT_APP_NAME} | ${pageName}`;
    dispatch(initFormData());
    _fetchAllCollaborators();
    _fetchAllZones();
    _fetchAllSectors();
    _fetchAllAgriculturalPractices();
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
                    <div className={"row"}>&nbsp;</div>
                  </div>

                  <form
                    name={`${pageName}Create`}
                    encType={`multipart/form-data`}
                    onSubmit={_handleFormSubmit}
                  >
                    <div className="card-body">
                      <WorkPlanForm
                        formData={store.formData}
                        _handleOnChange={_handleOnChange}
                        collaborators={store.collaborators}
                        _fetchAllCollaborators={_fetchAllCollaborators}
                        zones={store.zones}
                        _fetchAllZones={_fetchAllZones}
                        sectors={store.sectors}
                        _fetchAllSectors={_fetchAllSectors}
                        agriculturalPractices={store.agriculturalPractices}
                        _fetchAllAgriculturalPractices={
                          _fetchAllAgriculturalPractices
                        }
                        formValidationData={store.formValidation}
                        _handleFormValidation={_handleFormValidation}
                      />
                    </div>

                    <div className="card-footer clearfix">
                      <button
                        className="btn btn-sm btn-app float-end"
                        disabled={
                          Object.keys(store.formValidation).length > 0 ||
                          store.loading === true
                        }
                      >
                        {store.loading === true && (
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        )}{" "}
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default WorkPlanCreate;
