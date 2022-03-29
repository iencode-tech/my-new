import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Create.scss";
import Breadcrumb from "../../../components/common/breadcrumb/Breadcrumb";
import {
  handleListFormDataChange,
  fetchList,
  handleFormDataChange,
  handleFormValidation,
  initFormData,
  selectRawMaterial,
  storeData,
} from "../../../store/redux/Page/RawMaterial";
import RawMaterialForm from "../../../components/pageSpecific/rawMaterials/form/Form";

function RawMaterialCreate() {
  const store = useSelector(selectRawMaterial);
  const dispatch = useDispatch();
  const pageName = "Add raw material";
  const breadCrumbs = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Raw Materials",
      link: "/raw-materials",
    },
    {
      name: "Add",
      link: "",
    },
  ];

  const _fetchRawMaterials = (keyword = "") => {
    dispatch(handleListFormDataChange({ key: "keyword", value: keyword }));
    dispatch(fetchList({ ...store.listFormData, keyword }));
  };

  const _handleOnChange = (e, customData) => {
    if (customData && Object.keys(customData).length > 0) {
      Object.keys(customData).forEach((element, value) => {
        dispatch(
          handleFormDataChange({ key: element, value: customData[element] })
        );
      });
    } else {
      dispatch(
        handleFormDataChange({
          key: e.currentTarget.name,
          value: e.currentTarget.value,
        })
      );
    }
  };

  const _handleFormValidation = (key, value) => {
    dispatch(
      handleFormValidation({
        key,
        value,
      })
    );
  };

  const _addElementToArray = (element, value) => {
    dispatch(handleFormDataChange({ key: element, value: value }));
  };

  const _removeElementToArray = (element, value) => {
    dispatch(
      handleFormDataChange({ key: element, value: value, remove: true })
    );
  };

  const _handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(storeData(new FormData(e.currentTarget)));
  };

  useEffect(() => {
    document.title = `${process.env.REACT_APP_NAME} | ${pageName}`;
    dispatch(initFormData());
    _fetchRawMaterials();
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
                      <RawMaterialForm
                        formData={store.formData}
                        listData={store.list}
                        _handleOnChange={_handleOnChange}
                        _addElementToArray={_addElementToArray}
                        _removeElementToArray={_removeElementToArray}
                        _fetchRawMaterials={_fetchRawMaterials}
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

export default RawMaterialCreate;
