import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ChangePassword.scss";
import Breadcrumb from "../../../components/common/breadcrumb/Breadcrumb";
import {
  initFormData,
  handleFormDataChange,
  changePassword,
  selectProfile,
} from "../../../store/redux/Page/Profile";
import ChangePasswordForm from "../../../components/pageSpecific/profile/changePassword/ChangePassword";

function ChangePassword() {
  const store = useSelector(selectProfile);
  const dispatch = useDispatch();
  const pageName = "Change Password";
  const breadCrumbs = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Change Password",
      link: "",
    },
  ];

  const _handleOnChange = (e, customPath) => {
    dispatch(
      handleFormDataChange({
        key: e.currentTarget.name,
        value: e.currentTarget.value,
      })
    );
  };

  const _handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(changePassword(store.formData));
  };

  useEffect(() => {
    document.title = `${process.env.REACT_APP_NAME} | ${pageName}`;
    dispatch(initFormData());
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
                      <ChangePasswordForm
                        formData={store.formData}
                        _handleOnChange={_handleOnChange}
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

export default ChangePassword;
