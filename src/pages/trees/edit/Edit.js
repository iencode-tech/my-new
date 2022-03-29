import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Edit.scss";
import Breadcrumb from "../../../components/common/breadcrumb/Breadcrumb";
import {
  fetchAllSectors,
  fetchAllZones,
  handleFormDataChange,
  handleFormValidation,
  initFormData,
  readData,
  selectTree,
  updateData,
} from "../../../store/redux/Page/Tree";
import { useParams } from "react-router-dom";
import TreeForm from "../../../components/pageSpecific/trees/form/Form";

function TreeEdit() {
  const params = useParams();
  const store = useSelector(selectTree);
  const dispatch = useDispatch();
  const pageName = "Edit tree";
  const breadCrumbs = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Trees",
      link: "/trees",
    },
    {
      name: "Edit",
      link: "",
    },
  ];

  const _handleOnChange = (e) => {
    dispatch(
      handleFormDataChange({
        key: e.currentTarget.name,
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

  const _fetchAllZones = (keyword = "") => {
    dispatch(fetchAllZones({ ...store.zonesFormData, keyword }));
  };

  const _fetchAllSectors = (keyword = "") => {
    dispatch(fetchAllSectors({ ...store.sectorsFormData, keyword }));
  };

  const _handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateData({ id: params.id, formData: new FormData(e.currentTarget) })
    );
  };

  useEffect(() => {
    document.title = `${process.env.REACT_APP_NAME} | ${pageName}`;
    dispatch(initFormData());
    _fetchAllZones();
    _fetchAllSectors();
    dispatch(readData({ id: params.id }));
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

                  <form name={`${pageName}Create`} onSubmit={_handleFormSubmit}>
                    <div className="card-body">
                      <TreeForm
                        formData={store.formData}
                        _handleOnChange={_handleOnChange}
                        zones={store.zones}
                        _fetchAllZones={_fetchAllZones}
                        sectors={store.sectors}
                        _fetchAllSectors={_fetchAllSectors}
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
                         className=   "spinner-border spinner-border-sm"
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

export default TreeEdit;
